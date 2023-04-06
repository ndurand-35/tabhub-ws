import App from '@/app';
import validateEnv from '@utils/validateEnv';

import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import CollectionRoute from './api/routes/collections.route';
import BookmarkRoute from '@routes/bookmarks.route';
import FilesRoute from '@routes/files.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new CollectionRoute(), new BookmarkRoute(), new FilesRoute()]);

app.listen();
