import axios from 'axios';
import url from 'url';
import { JSDOM } from 'jsdom'

import { ClassConstructor } from "class-transformer";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { CreateBookmarkDto } from '@/core/databases/dtos/bookmarks.dto';
import { MinioService } from '@/core/services/minio.service';
import { User } from '@/core/utils/interfaces/users.interface';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const getLinkData = async (bookmarkData: CreateBookmarkDto,userData : User): Promise<CreateBookmarkDto> => {
  try {
    let response = await axios.get(bookmarkData.link)
    const document : Document = new JSDOM(`${response.data}`).window.document;
    bookmarkData.title = document.title.split('-')[0]
    bookmarkData.description = document.querySelector('meta[name="description"]').getAttribute('content')
    bookmarkData.website = url.parse(bookmarkData.link).host
    /* Récuperation de l'image meta Facebook */
    bookmarkData.imagePath = document.querySelector('meta[property="og:image"]').getAttribute('content')
    bookmarkData = await webLinkToS3(bookmarkData, userData)
  } catch (err) {
    console.log(err)
    let domain = (new URL(bookmarkData.link));
    bookmarkData.title = domain.hostname.split('.')[0]
    bookmarkData.imagePath = "placeholder/image.png"
  }
  return bookmarkData
}

export const webLinkToS3 = async (bookmarkData: CreateBookmarkDto, userData: User): Promise<CreateBookmarkDto> => {
  const minioService = new MinioService()
  const extension = bookmarkData.imagePath.substring(bookmarkData.imagePath.lastIndexOf("."))

  const response = await axios.get(bookmarkData.imagePath, { responseType: 'arraybuffer' })
  const buffer = Buffer.from(response.data, "utf-8")
  bookmarkData.imagePath = `${userData.id}/${bookmarkData.website}/${makeid(12)}${extension}`;
  await minioService.createFile(bookmarkData.imagePath, buffer)
  return bookmarkData;
}

  


export function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const Match = <T>(
  type: ClassConstructor<T>,
  property: (o: T) => any,
  validationOptions?: ValidationOptions,
) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
};

@ValidatorConstraint({ name: "Match" })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [fn] = args.constraints;
    return fn(args.object) === value;
  }

  defaultMessage(args: ValidationArguments) {
    const [constraintProperty]: (() => any)[] = args.constraints;
    return `${constraintProperty} and ${args.property} does not match`;
  }
}