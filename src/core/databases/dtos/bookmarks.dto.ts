import { IsString, IsNumber, ValidateIf } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  public link: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  public title?: string| undefined;

  @IsNumber()
  public collectionId: number;
}

export class UpdateBookmarkDto {
  @IsNumber()
  public id: number;

  @IsString()
  public link: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  public title?: string | undefined;
  
  @IsNumber()
  public collectionId: number;
}
