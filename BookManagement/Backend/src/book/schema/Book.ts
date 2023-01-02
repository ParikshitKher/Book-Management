import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;
@Schema()
export class Book {
  @Prop()
  title: string;
  @Prop()
  author: string;
  @Prop()
  published: number;
  @Prop()
  description: string;
  @Prop()
  createdBy: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
