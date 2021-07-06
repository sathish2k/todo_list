import {Controller,Res,Query,Get,HttpStatus,Post,Body,Param,NotFoundException,Put,Delete, Req} from '@nestjs/common';
import { TaskService } from './task.service';
// import { UsersEmails } from '../config';
import { ApiQuery } from '@nestjs/swagger';
import { CreateTaskDTO } from './dto/task.dto';
import * as mongoose from 'mongoose';

@Controller('task')
export class TaskController {
  constructor(private readonly TaskService: TaskService) {}
  // @Get()
  // findAll(): string {
  //   return 'All Tasks';
  // }
  // @Get(':id')
  // findById(@Param() param): string {
  //   return param.id;
  // }

  @Post('/add')
  async addTask(@Req() req, @Res() res, @Body() CreateTaskDTO: CreateTaskDTO) {
    try {
      console.log(req.userId)
      const lists = await this.TaskService.create({...CreateTaskDTO, owner: new mongoose.Types.ObjectId(req.userId)});
      return res.status(HttpStatus.OK).json({
        message: 'Task has been created successfully',
        lists,
      });
    } catch (err) {
      console.error(`[Task]  Error creating a task: ${JSON.stringify(err)}`);
      return res.status(500).json({
        message: `Internal server error!`,
      });
    }
  }

  @Get('')
  async findAll(@Req() req, @Res() res) {
    try {
      const lists = await this.TaskService.findAll(req.userId);
      return res.status(HttpStatus.OK).json(lists);
    } catch (err) {
      console.error(`[Task]  Error: ${JSON.stringify(err)}`);
      return res.status(500).json({
        message: `Internal server error!`,
      });
    }
  }
  @Delete('/delete')
  async delete(@Res() res, @Query('id') id: string) {
    try {
      const lists = await this.TaskService.delete(id);
      if (!lists) throw new NotFoundException('Post does not exist');
      return res.status(HttpStatus.OK).json({
        message: 'Post has been deleted',
        lists,
      });
    } catch (err) {
      console.error(`[Task]  Error while removing task: ${JSON.stringify(err)}`);
      return res.status(500).json({
        message: `Internal server error!`,
      });
    }
  }

  @Post('/update')
  async update(@Req() req, @Res() res, @Query('id') id: string, @Body() CreateTaskDTO: CreateTaskDTO,) {
    console.log("updatttt")
    const allowedUpdates = ['description', 'completed','title'];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
    if(!isValidUpdate) return res.status(HttpStatus.BAD_REQUEST).json({ 
      message: "Invalid update operation"
    });
    // console.log('**********', req.userId)
    // return
    try {
      const lists = await this.TaskService.update({_id: id, owner: req.userId}, CreateTaskDTO);
      if(!lists?.nModified) return res.status(HttpStatus.BAD_REQUEST).json({message: "Invalid request"})
      return res.status(HttpStatus.OK).json({
        message: 'Post has been updated successfully!',
        lists,
      });
    } catch(err){
      console.error(`[Task]  Error while updating task: ${JSON.stringify(err)}`);
      return res.status(500).json({
        message: `Internal server error!`,
      });
    }
  }

  @Get('/mystats')
  async getMystats(@Req() req, @Res() res, @Query('completed') completed: Boolean) {
    try{
      let condition = {owner: req.userId};
      if(completed ?? 0 != 0) condition['completed'] = completed;
      const count = await this.TaskService.getStats(condition);
      return res.status(HttpStatus.OK).json({count})
    }catch(err){
      console.error(`[Task]  Error while getting stats: ${JSON.stringify(err)}`);
      return res.status(500).json({
        message: `Internal server error!`,
      });
    }
  }
}
