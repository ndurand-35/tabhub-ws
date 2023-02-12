import { IsString, IsNumber } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  public link: string;
}

export class UpdateBookmarkDto {
  @IsNumber()
  public id: number;

  @IsString()
  public name: string;
}
