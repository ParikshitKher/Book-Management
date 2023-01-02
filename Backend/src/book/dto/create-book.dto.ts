import * as mongoose from 'mongoose';
export class CreateBookDto {
  title: string;
  author: string;
  published: number;
  description: string;
  createdBy: mongoose.Types.ObjectId;
}
