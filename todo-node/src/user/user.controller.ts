import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { LoginUserDTO } from './dto/loginUser.dto';
import * as bcrypt from 'bcryptjs';

@Controller('user')
export class UserController {
  constructor (private userService: UserService) {}

  @Post('/register')
  async addUser(@Res() res, @Body() userBody: CreateUserDTO) {
    try{
      console.log(userBody);
      delete userBody['tokens'];
      const user = await this.userService.create(userBody);
      const token = await this.userService.generateAuthToken(user);
      user['tokens'] = user['tokens'].concat({token});
      await user.save();
      delete user.password;
      res.cookie('token', token);
      return res.status(HttpStatus.CREATED).json({
        message: 'User created successfully',
        user,
        token
      });
    }catch (err) {
      console.error(`[User]  Error while creating user: ${JSON.stringify(err)}`);
      return res.status(500).json({
        message: `Internal server error!`,
      });
    }
  }

  @Post('/login')
  async loginUser(@Res() res, @Body() userBody: LoginUserDTO) {
    try{
      console.log(userBody)
      const user = await this.userService.login(userBody);
      console.log(user)
      const isMatch = await bcrypt.compare(userBody.password, user.password);
      if(!isMatch) return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Invalid credentials!"
      });
      const token = await this.userService.generateAuthToken(user);
      user['tokens'] = user['tokens'].concat({token});
      await user.save();
      res.cookie('token', token);
      return res.status(HttpStatus.OK).json({
        message: "Login successful",
        user,
        token
      });
    }catch(err){
      return res.status(500).json({
        message: `Internal server error!`,
      });
    }
  }

  @Post('/logout')
  async logoutUser(@Req() req, @Res() res, @Body() user) {
    try {
      req.user.tokens = req.user.tokens.filter(token => { return token.token != req.token });
      await req.user.save();
      res.cookie('token', '');
      res.status(HttpStatus.OK).json({
        message: "Logout successful!"
      });
    }catch(err){
      return res.status(500).json({
        message: `Internal server error!`,
      });
    }
  }

  @Post('/logoutAll')
  async logoutUserAll(@Req() req, @Res() res, @Body() user) {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.cookie('token', '');
      res.status(HttpStatus.OK).json({
        message: "Logout all successful!"
      });
    }catch(err){
      return res.status(500).json({
        message: `Internal server error!`,
      });
    }
  }
}
