import { NextFunction, Request, Response } from 'express';
import { CreateCollectionDto, UpdateCollectionDto } from '@dtos/collections.dto';
import { CollectionService } from '@services/index.service';
import { User, Collection, RequestWithUser } from '@/core/utils/interfaces/index.interface';

class CollectionsController {
  public collectionService = new CollectionService();

  public getCollection = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const findMyCollectionData: Collection[] = await this.collectionService.findMyCollection(userData);

      res.status(200).json({ data: findMyCollectionData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCollectionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const collectionId = Number(req.params.id);
      const findOneCollectionData: Collection = await this.collectionService.findCollectionById(collectionId);

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
