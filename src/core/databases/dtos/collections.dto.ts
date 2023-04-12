import { CollectionType } from '@/core/utils/interfaces/index.interface';
import { IsString, IsNumber, ValidateIf } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  public name: string;

  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  public icon?: string | null;

  @IsNumber()
  @ValidateIf((object, value) => value !== undefined)
  public parentId?: number | null;

  public collectionType?: CollectionType | null;
}

export class UpdateCollectionDto {
  @IsNumber()
  public id: number;

  @IsString()
  public name: string;

  @IsString()
  public icon: string;

  @IsNumber()
  @ValidateIf((object, value) => value !== undefined)
  public parentId?: number | null;
}
