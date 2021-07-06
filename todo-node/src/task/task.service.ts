import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './interfaces/task.interface';
import { CreateTaskDTO } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private TaskModel: Model<Task>) {}

  async create(CreateTaskDTO: CreateTaskDTO): Promise<any> {
    const createdCat = new this.TaskModel(CreateTaskDTO);
    return createdCat.save();
  }
  async findAll(id): Promise<any> {
    return await this.TaskModel.find({owner: id}).exec();
  }
  async findById(id): Promise<Task> {
    const customer = await this.TaskModel.findById(id).exec();
    return customer;
  }
  async find(req): Promise<any> {
    return await this.TaskModel.find(req).exec();
  }
  async update(obj, CreateTaskDTO: CreateTaskDTO): Promise<any> {
    return await this.TaskModel.updateOne(obj, CreateTaskDTO);
  }
  async delete(id): Promise<any> {
    return await this.TaskModel.findByIdAndRemove(id);
  }

  async getStats(condition): Promise<any> {
    return await this.TaskModel.countDocuments(condition);
  }

}
