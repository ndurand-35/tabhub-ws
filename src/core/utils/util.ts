import axios from 'axios';
import {JSDOM} from 'jsdom'
import { CreateBookmarkDto } from '@/core/databases/dtos/bookmarks.dto';
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

export const getLinkData = async (bookmarkData: CreateBookmarkDto): Promise<CreateBookmarkDto> => {
  try {
    let response = await axios.get(bookmarkData.link)
    const document = new JSDOM(`${response.data}`).window.document;
    bookmarkData.title = document.title
  } catch (err) {
    let domain = (new URL(bookmarkData.link));
    bookmarkData.title = domain.hostname.split('.')[0]
  }
  return bookmarkData
}