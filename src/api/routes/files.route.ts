import { Router } from 'express';
import multer from 'multer';

import AuthController from '@controllers/auth.controller';
import { CreateUserDto,LoginUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import FilesController from '../controllers/files.controller';

class FilesRoute implements Routes {
  public path = '/file';
  public router = Router();
  public filesController = new FilesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, multer().none(), this.filesController.createUserFiles);
    // this.router.post(`${this.path}/login`, validationMiddleware(LoginUserDto, 'body'), this.authController.logIn);
    // this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logOut);
  }
}

export default FilesRoute;
