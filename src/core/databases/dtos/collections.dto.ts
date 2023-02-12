import { IsString, IsNumber } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  public name: string;
}

export class UpdateCollectionDto {
  @IsNumber()
  public id: number;

  @IsString()
  public name: string;
}
