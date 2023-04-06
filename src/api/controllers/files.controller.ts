import { NextFunction, Request, Response } from 'express';
import { User, Collection, RequestWithUser, Bookmark } from '@/core/utils/interfaces/index.interface';

class FilesController {
  public createUserFiles = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      console.log(req.body);
      //console.log(req.files)
      //const bookmarkData: CreateBookmarkDto = req.body;

      //const findOneCollectionData: Collection = await this.collectionService.findCollectionById(bookmarkData.collectionId, userData);

      //const createBookmarkData: Bookmark = await this.bookmarkService.createBookmark(enhancedBookmarkData, findOneCollectionData);
      res.status(201).json({ message: 'created' });
    } catch (error) {
      console.log(error)
      next(error);
    }
  };
}

export default FilesController;
