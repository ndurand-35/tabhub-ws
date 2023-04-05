import { NextFunction, Request, Response } from 'express';

import { User } from '@interfaces/users.interface';
import { RequestWithUser } from '@interfaces/auth.interface';

import { CreateUserDto,LoginUserDto } from '@dtos/users.dto';
import {AuthService} from '@services/index.service';

class AuthController {
  public authService = new AuthService();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const registerUserData: User = await this.authService.register(userData);

      res.status(201).json({ data: registerUserData, message: 'register' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginUserDto = req.body;
      const { findUser , token } = await this.authService.login(userData);

      res.status(200).json({ data: {token : token}, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
