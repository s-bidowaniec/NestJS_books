import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dtos/create-book.dto';
import { UpdateBookDTO } from './dtos/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}
  // Get
  @Get('/')
  getAll() {
    return this.booksService.getAll();
  }
  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.booksService.getById(id);
  }
  // Post
  @Post('/')
  addBook(@Body() formData: CreateBookDTO) {
    return this.booksService.addBook(formData);
  }
  // Put
  @Put('/:id')
  updateBook(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() formData: UpdateBookDTO,
  ) {
    return this.booksService.updateBook(id, formData);
  }
  // Delete
  @Delete('/')
  deleteBook(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.booksService.deleteBookById(id);
  }
}
