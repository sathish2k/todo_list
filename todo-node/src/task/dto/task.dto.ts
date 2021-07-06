import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class CreateTaskDTO {
  @ApiProperty()
  readonly title: string;
  readonly description: string;
  readonly completed: Boolean;
  readonly owner: mongoose.Types.ObjectId;
}
