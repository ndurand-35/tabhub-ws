import { Router } from 'express';
import BookmarkController from '@controllers/bookmarks.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import { CreateBookmarkDto } from '@/core/databases/dtos/bookmarks.dto';

class BookmarkRoute implements Routes {
  public path = '/bookmark';
  public router = Router();
  public bookmarkController = new BookmarkController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(`${this.path}`, authMiddleware, this.bookmarkController.getBookmark);
    // this.router.get(`${this.path}/:id(\\d+)`, this.usersController.getUserById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateBookmarkDto, 'body'), this.bookmarkController.createBookmark);
    this.router.put(`${this.path}/:id(\\d+)`, authMiddleware, validationMiddleware(CreateBookmarkDto, 'body', true), this.bookmarkController.updateBookmark);
    // this.router.delete(`${this.path}/:id(\\d+)`, this.bookmarkController.deleteBookmark);
  }
}

export default BookmarkRoute;
