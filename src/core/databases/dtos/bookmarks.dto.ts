import { IsString, IsNumber, ValidateIf } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  public link: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  public website?: string | undefined;

  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  public title?: string | undefined;

  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  public description?: string | undefined;

  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  public imagePath?: string | undefined;

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

  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  public description?: string | undefined;

  @IsNumber()
  public collectionId: number;
}
