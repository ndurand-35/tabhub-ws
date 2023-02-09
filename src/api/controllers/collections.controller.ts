import { NextFunction, Request, Response } from 'express';
import { CreateCollectionDto } from '@dtos/collections.dto';
import { CollectionService } from '@services/index.service';
 import { User,Collection,RequestWithUser } from '@/core/utils/interfaces/index.interface';

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

  // public getUserById = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const userId = Number(req.params.id);
  //     const findOneUserData: User = await this.userService.findUserById(userId);

  //     res.status(200).json({ data: findOneUserData, message: 'findOne' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public createCollection = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const collectionData: CreateCollectionDto = req.body;
      const createCollectionData: Collection = await this.collectionService.createCollection(collectionData,userData);

      res.status(201).json({ data: createCollectionData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  // public updateUser = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const userId = Number(req.params.id);
  //     const userData: CreateUserDto = req.body;
  //     const updateUserData: User = await this.userService.updateUser(userId, userData);

  //     res.status(200).json({ data: updateUserData, message: 'updated' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const userId = Number(req.params.id);
  //     const deleteUserData: User = await this.userService.deleteUser(userId);

  //     res.status(200).json({ data: deleteUserData, message: 'deleted' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default CollectionsController;
