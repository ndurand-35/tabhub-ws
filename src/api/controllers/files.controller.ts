import { NextFunction, Request, Response } from 'express';
import { User, Collection, RequestWithUser, Bookmark, RequestUF } from '@/core/utils/interfaces/index.interface';

class FilesController {
  public createUserFiles = async (req: RequestUF, res: Response, next: NextFunction) => {
    try {
      res.status(201).json({ filePath : req.file.key,message: 'created' });
    } catch (error) {
      console.log(error)
      next(error);
    }
  };
}

export default FilesController;
