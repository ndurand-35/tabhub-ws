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

  // foreign keys are automatically added by associations methods (like Collection.belongsTo)
  // by branding them using the `ForeignKey` type, `Collection.init` will know it does not need to
  // display an error if userId is missing.
  public userId: ForeignKey<UserModel['id']>;

  // `user` is an eagerly-loaded association.
  // We tag it as `NonAttribute`
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
  CollectionModel.hasMany(BookmarkModel, { sourceKey: 'id', foreignKey: 'collectionId', as: 'bookmarks' });
  return CollectionModel;
}
