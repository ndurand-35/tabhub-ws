import { NextFunction, Request, Response } from 'express';
import { CreateBookmarkDto } from '@dtos/bookmarks.dto';
import { BookmarkService } from '@services/index.service';
import { User, Bookmark, RequestWithUser } from '@/core/utils/interfaces/index.interface';

class BookmarkController {
  public bookmarkService = new BookmarkService();

  // public getCollection = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  //   try {
  //     const userData: User = req.user;
  //     const findMyCollectionData: Collection[] = await this.bookmarkService.findMyCollection(userData);

  //     res.status(200).json({ data: findMyCollectionData, message: 'findAll' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public getCollectionById = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const userId = Number(req.params.id);
  //     const findOneCollectionData: Collection = await this.bookmarkService.findCollectionById(userId);

  //     res.status(200).json({ data: findOneCollectionData, message: 'findOne' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public createBookmark = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const bookmarkData: CreateBookmarkDto = req.body;
      const createCBookmarkData: Bookmark = await this.bookmarkService.createBookmark(bookmarkData, userData);

      res.status(201).json({ data: createCBookmarkData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  // public updateCollection = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  //   try {
  //     const bookmarkId = Number(req.params.id);
  //     const bookmarkData: UpdateCollectionDto = req.body;
  //     const updateCollectionData: Collection = await this.bookmarkService.updateCollection(bookmarkId, bookmarkData);

  //     res.status(200).json({ data: updateCollectionData, message: 'updated' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public deleteCollection = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const bookmarkId = Number(req.params.id);
  //     const deleteCollectionData: Collection = await this.bookmarkService.deleteCollection(bookmarkId);

  //     res.status(200).json({ data: deleteCollectionData, message: 'deleted' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default BookmarkController;
