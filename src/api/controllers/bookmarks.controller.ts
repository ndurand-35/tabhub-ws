import { NextFunction, Request, Response } from 'express';
import { CreateBookmarkDto, UpdateBookmarkDto } from '@dtos/bookmarks.dto';
import { BookmarkService, CollectionService } from '@services/index.service';
import { User, Bookmark, RequestWithUser, Collection, CollectionType } from '@/core/utils/interfaces/index.interface';
import { getLinkData } from '@/core/utils/util';
import { MinioService } from '@/core/services/minio.service';

class BookmarkController {
  public bookmarkService = new BookmarkService();
  public collectionService = new CollectionService();
  public minioService = new MinioService();

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

      const findOneCollectionData: Collection = await this.collectionService.findCollectionById(bookmarkData.collectionId, userData);

      /* Récupération d'information à partir du lien */
      const enhancedBookmarkData = await getLinkData(bookmarkData, userData);

      const createBookmarkData: Bookmark = await this.bookmarkService.createBookmark(enhancedBookmarkData, findOneCollectionData);
      res.status(201).json({ data: createBookmarkData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateBookmark = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const bookmarkId = Number(req.params.id);
      const bookmarkData: UpdateBookmarkDto = req.body;
      const updateBookmarkData: Bookmark = await this.bookmarkService.updateBookmark(bookmarkId, bookmarkData);
      updateBookmarkData.imageLink = await this.minioService.getObjectUrl(updateBookmarkData.imagePath);

      res.status(200).json({ data: updateBookmarkData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBookmark = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const bookmarkId = Number(req.params.id);
      const userData: User = req.user;

      const foundBookmark: Bookmark = await this.bookmarkService.findBookmarkById(bookmarkId);
      if (foundBookmark.collection?.collectionType == CollectionType.TRASH) {
        const deleteBookmarkData: Bookmark = await this.bookmarkService.deleteBookmark(bookmarkId);
      } else {
        const trashCollection: Collection = await this.collectionService.findCollectionByType(CollectionType.TRASH as CollectionType, userData);
        const movedBookmarkData: Bookmark = await this.bookmarkService.updateBookmark(bookmarkId, {
          collectionId: trashCollection.id,
          id: foundBookmark.id,
          link: foundBookmark.link,
        });
      }
      res.status(200).json({ data: foundBookmark, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default BookmarkController;
