import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Model } from 'mongoose';
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Auth middleware log');
    //Authentication
    try {
      // console.log(req.headers);
      const token = req.headers['authorization'].replace('Bearer ', '') || req.cookies['token'];
      // console.log(token);
      const cookies = req.cookies;
      const decoded = await jwt.verify(token, 'JWT_SECRET_KEY');
      req['userId'] = decoded._id;
      const user = await this.userModel.findOne({
        _id: mongoose.Types.ObjectId(decoded._id),
        'tokens.token': token,
      });
      if (!user) {
        console.log(`No user for the id ${decoded._id}, token ${token}`);
        throw Error(`No user found`);
      }
      req['user'] = user;
      req['token'] = token;
      next();
    } catch (err) {
      // clear cookies
      res.cookie('token', '');
      console.error(
        `[Auth]  Error during JWT authentication: ${JSON.stringify(err)}`,
      );
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: `Authentication failed`,
      });
    }
  }
}
