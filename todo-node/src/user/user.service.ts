import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import * as jwt from 'jsonwebtoken';
import { CreateUserDTO } from './dto/createUser.dto';
import { LoginUserDTO } from './dto/loginUser.dto';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUser: CreateUserDTO): Promise<any> {
    const user = new this.userModel(createUser);
    const token = await jwt.sign({ _id: user._id.toString() }, 'JWT_SECRET_KEY', { expiresIn: '30d' });
    return user.save();
  }

  async login(loginUser: LoginUserDTO): Promise<any> {
    return this.userModel.findOne({ email: loginUser.email });
    // const isMatch = await bcrypt.compare(loginUser.password, user.password);
    // if(!isMatch) return {userFound: false};
    // return {userFound: true, user}
  }

  async generateAuthToken(user: User): Promise<any> {
   return jwt.sign({ _id: user._id.toString() }, 'JWT_SECRET_KEY', { expiresIn: '30d' });
  }
}
