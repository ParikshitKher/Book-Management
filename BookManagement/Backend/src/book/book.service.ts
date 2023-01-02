import { Injectable } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schema/Book';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  create(book: Book): Promise<Book> {
    const model = new this.bookModel();
    model.title = book.title;
    model.author = book.author;
    model.published = book.published;
    model.description = book.description;
    model.createdBy = book.createdBy;

    return model.save();
  }

  findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  findOne(id: string): Promise<Book> {
    return this.bookModel.findById(id).exec();
  }

  update(id: string, updateBookDto: UpdateBookDto): Promise<any> {
    return this.bookModel
      .updateOne(
        { _id: id },
        {
          title: updateBookDto.title,
          author: updateBookDto.author,
          published: updateBookDto.published,
          description: updateBookDto.description,
          createdBy: updateBookDto.createdBy,
        },
      )
      .exec();
  }

  remove(id: string): Promise<any> {
    return this.bookModel.deleteOne({ _id: id }).exec();
  }
}
