import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class UpdateTaskDTO {
  @ApiProperty()
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly completed: Boolean;
}
