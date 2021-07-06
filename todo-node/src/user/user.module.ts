import { Module, RequestMethod } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware/middleware-consumer.interface';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AuthMiddleware } from 'src/middleware/auth';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])]
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .exclude(
      { path: 'user/register', method: RequestMethod.POST },
      { path: 'user/login', method: RequestMethod.POST },

    )
    .forRoutes(UserController);
  } 
}
