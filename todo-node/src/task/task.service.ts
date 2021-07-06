import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose'
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
    return await this.TaskModel.find({ owner: id }).exec();
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

  async getStats(owner): Promise<any> {
    // return await Promise.all([this.TaskModel.countDocuments({owner}), this.TaskModel.countDocuments({owner, completed: true}), this.TaskModel.countDocuments({owner, completed: false})]);
    return await this.TaskModel.aggregate([
      {
        '$facet': {
          'total': [
            {
              '$match': {
                'owner': mongoose.Types.ObjectId(owner)
              }
            }, {
              '$count': 'total'
            }
          ], 
          'completed': [
            {
              '$match': {
                'owner': mongoose.Types.ObjectId(owner), 
                'completed': true
              }
            }, {
              '$count': 'completed'
            }
          ], 
          'notcompleted': [
            {
              '$match': {
                'owner': mongoose.Types.ObjectId(owner), 
                'completed': false
              }
            }, {
              '$count': 'notcompleted'
            }
          ]
        }
      }, {
        '$project': {
          'total': {
            '$arrayElemAt': [
              '$total.total', 0
            ]
          }, 
          'completed': {
            '$arrayElemAt': [
              '$completed.completed', 0
            ]
          }, 
          'notcompleted': {
            '$arrayElemAt': [
              '$notcompleted.notcompleted', 0
            ]
          }
        }
      }
    ]);
  }
}
