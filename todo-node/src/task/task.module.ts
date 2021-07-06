import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskSchema } from './schemas/task.schema';
import { AuthMiddleware } from 'src/middleware/auth';
import { UserSchema } from 'src/user/schemas/user.schema';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]), MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])]
})
export class TaskModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(TaskController)
  } 
}
