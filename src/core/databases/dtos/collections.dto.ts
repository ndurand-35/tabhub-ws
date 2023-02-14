import { CollectionType } from '@/core/utils/interfaces/index.interface';
import { IsString, IsNumber } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  public name: string;

  @IsString()
  public icon: string;
  
  public collectionType?: CollectionType | null;

}

export class UpdateCollectionDto {
  @IsNumber()
  public id: number;

  @IsString()
  public name: string;

  @IsString()
  public icon: string;
}
