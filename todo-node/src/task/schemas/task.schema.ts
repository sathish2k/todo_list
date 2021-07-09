import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TaskSchema = new Schema({
  title: String,
  description: String,
  completed: Boolean,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

