import { NextFunction, Request, Response } from 'express';
import { CreateBookmarkDto ,UpdateBookmarkDto} from '@dtos/bookmarks.dto';
import { BookmarkService,CollectionService } from '@services/index.service';
import { User, Bookmark, RequestWithUser, Collection } from '@/core/utils/interfaces/index.interface';
import { getLinkData } from '@/core/utils/util';



class BookmarkController {
  public bookmarkService = new BookmarkService();
  public collectionService = new CollectionService();

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
      const bookmarkData: CreateBookmarkDto = req.body;

      const findOneCollectionData: Collection = await this.collectionService.findCollectionById(bookmarkData.collectionId);

      /* Récupération d'information à partir du lien */
      const enhancedBookmarkData = await getLinkData(bookmarkData)

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
      const updateCollectionData: Collection = await this.bookmarkService.updateBookmark(bookmarkId, bookmarkData);

      res.status(200).json({ data: updateCollectionData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

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
