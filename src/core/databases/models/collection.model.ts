import { Sequelize, DataTypes, Model, Optional, NonAttribute, ForeignKey } from 'sequelize';
import { Collection } from '@interfaces/collection.interface';
import { UserModel } from '@models/users.model';

export type CollectionCreationAttributes = Optional<Collection, 'id' | 'name'>;

export class CollectionModel extends Model<Collection, CollectionCreationAttributes> implements Collection {
  public id: number;
  public name: string;

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
    },
    {
      tableName: 'collection',
      sequelize,
    },
  );
  return CollectionModel;
}
