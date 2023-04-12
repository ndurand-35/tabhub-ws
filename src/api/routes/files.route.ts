import { Router } from 'express';
import FilesController from '@controllers/files.controller';

import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

import { MinioService } from '@/core/services/minio.service';
const minioService = new MinioService();
const multer = minioService.getMulter();

class FilesRoute implements Routes {
  public path = '/file';
  public router = Router();
  public filesController = new FilesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, authMiddleware, multer.single('file'), this.filesController.createUserFiles);
    // this.router.post(`${this.path}/login`, validationMiddleware(LoginUserDto, 'body'), this.authController.logIn);
    // this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logOut);
  }
}

export default FilesRoute;
