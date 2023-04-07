import { Sequelize, DataTypes, Model, Optional, NonAttribute, ForeignKey } from 'sequelize';
import { Bookmark } from '@/core/utils/interfaces/bookmark.interface';
import { CollectionModel } from '@models/collection.model';

export type BookmarkCreationAttributes = Optional<Bookmark, 'id' | 'link'>;

export class BookmarkModel extends Model<Bookmark, BookmarkCreationAttributes> implements Bookmark {
  public id: number;
  public title: string;
  public description: string;
  public imagePath: string;
  public imageLink?: string;
  public website: string;
  public link: string;

  // foreign keys are automatically added by associations methods (like Bookmark.belongsTo)
  // by branding them using the `ForeignKey` type, `Bookmark.init` will know it does not need to
  // display an error if userId is missing.
  public collectionId: ForeignKey<CollectionModel['id']>;

  // `user` is an eagerly-loaded association.
  // We tag it as `NonAttribute`
  public collection: NonAttribute<CollectionModel>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof BookmarkModel {
  BookmarkModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      link: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      website: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      imagePath: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      collectionId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      imageLink: {
        type: DataTypes.VIRTUAL
      }
    },
    {
      tableName: 'bookmark',
      sequelize,
    },
  );
  return BookmarkModel;
}
