import { Sequelize, DataTypes, Model, Optional, NonAttribute, ForeignKey } from 'sequelize';
import { Collection,CollectionType } from '@/core/utils/interfaces/collections.interface';
import { UserModel } from '@models/users.model';
import { BookmarkModel } from './bookmark.model';

export type CollectionCreationAttributes = Optional<Collection, 'id' | 'name'>;

export class CollectionModel extends Model<Collection, CollectionCreationAttributes> implements Collection {
  public id: number;
  public name: string;
  public icon: string;
  public collectionType: CollectionType;

  //public parentId: ForeignKey<CollectionModel['id']>;
  public parent: NonAttribute<CollectionModel>;

  public userId: ForeignKey<UserModel['id']>;
  public user: NonAttribute<UserModel>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CollectionModel {
  CollectionModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      icon: {
        allowNull: true,
        type: DataTypes.STRING(50),
      },
      collectionType: {
        allowNull: true,
        type: DataTypes.ENUM(...Object.keys(CollectionType)),

      },
      parentId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'collection',
      sequelize,
    },
  );
  CollectionModel.hasMany(CollectionModel, {sourceKey: 'id',foreignKey : 'parentId', as : 'children'});
  CollectionModel.hasMany(BookmarkModel, { sourceKey: 'id', foreignKey: 'collectionId', as: 'bookmarks' });
  return CollectionModel;
}
