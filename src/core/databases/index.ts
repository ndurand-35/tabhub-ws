import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import UserModel, { buildUserAssociation } from '@models/users.model';
import CollectionModel, { buildCollectionAssociation } from '@models/collection.model';
import BookmarkModel, { buildBookmarkAssociation } from '@models/bookmark.model';
import { logger } from '@utils/logger';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT),
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
  dialectOptions: {
    ssl: {
      require: 'false',
    },
  },
});

sequelize.authenticate();

const bookmark = BookmarkModel(sequelize);
const collection = CollectionModel(sequelize);
const user = UserModel(sequelize);

buildUserAssociation();
buildBookmarkAssociation();
buildCollectionAssociation();

const DB = {
  Bookmark: bookmark,
  Collection: collection,
  Users: user,
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
