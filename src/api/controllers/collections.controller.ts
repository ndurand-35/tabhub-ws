import { NextFunction, Request, Response } from 'express';
import { CreateCollectionDto, UpdateCollectionDto } from '@dtos/collections.dto';
import { CollectionService } from '@services/index.service';
import { User, Collection, RequestWithUser, CollectionType, Bookmark } from '@/core/utils/interfaces/index.interface';
import { HttpException } from '@/core/utils/exceptions/HttpException';
import { MinioService } from '@/core/services/minio.service';

class CollectionsController {
  public collectionService = new CollectionService();
  public minioService = new MinioService();

  public getCollection = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const findMyCollectionData: Collection[] = await this.collectionService.findMyCollection(userData);

      res.status(200).json({ data: findMyCollectionData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCollectionById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const collectionId = Number(req.params.id);
      const findOneCollectionData: Collection = await this.collectionService.findCollectionById(collectionId, userData);

      let bookmarksWithImageLink: Array<Bookmark> = await Promise.all(
        findOneCollectionData.bookmarks.map(async (bookmark: Bookmark) => {
          bookmark.imageLink = await this.minioService.getObjectUrl(bookmark.imagePath);
          return bookmark;
        }),
      );
      findOneCollectionData.bookmarks = bookmarksWithImageLink;

      res.status(200).json({ data: findOneCollectionData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getCollectionByType = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      let collectionType: CollectionType;
      if (Object.values(CollectionType).some((col: string) => col === req.params.type)) collectionType = <CollectionType>(<unknown>req.params.type);
      else throw new HttpException(400, 'collectionType is invalid');

      const userData: User = req.user;
      const findOneCollectionData: Collection = await this.collectionService.findCollectionByType(collectionType, userData);
      let bookmarksWithImageUrl: Array<Bookmark> = await Promise.all(
        findOneCollectionData.bookmarks.map(async bookmark => {
          bookmark.imagePath = await this.minioService.getObjectUrl(bookmark.imagePath);
          return bookmark;
        }),
      );
      findOneCollectionData.bookmarks = bookmarksWithImageUrl;

      res.status(200).json({ data: findOneCollectionData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCollection = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const collectionData: CreateCollectionDto = req.body;
      const createCollectionData: Collection = await this.collectionService.createCollection(collectionData, userData);

      res.status(201).json({ data: createCollectionData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCollection = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const collectionId = Number(req.params.id);
      const collectionData: UpdateCollectionDto = req.body;
      const updateCollectionData: Collection = await this.collectionService.updateCollection(collectionId, collectionData);

      res.status(200).json({ data: updateCollectionData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCollection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const collectionId = Number(req.params.id);
      const deleteCollectionData: Collection = await this.collectionService.deleteCollection(collectionId);

      res.status(200).json({ data: deleteCollectionData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CollectionsController;
