import { Router } from 'express';
import CollectionController from '@controllers/collections.controller';
import { CreateCollectionDto } from '@dtos/collections.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';

class CollectionRoute implements Routes {
  public path = '/collection';
  public router = Router();
  public collectionController = new CollectionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.collectionController.getCollection);
    this.router.get(`${this.path}/type/:type`, authMiddleware, this.collectionController.getCollectionByType);
    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.collectionController.getCollectionById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateCollectionDto, 'body'), this.collectionController.createCollection);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateCollectionDto, 'body', true), this.collectionController.updateCollection);
    this.router.delete(`${this.path}/:id(\\d+)`, this.collectionController.deleteCollection);
  }
}

export default CollectionRoute;
