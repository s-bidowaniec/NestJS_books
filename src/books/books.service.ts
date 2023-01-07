import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { Book } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaService) {}
  // Get
  async getAll(): Promise<Book[]> {
    return this.prismaService.book.findMany({});
  }
  async getById(id: Book['id']): Promise<Book | void> {
    const currentBook = this.prismaService.book.findUnique({ where: { id } });
    if (!currentBook) {
      throw new NotFoundException('Book not found');
    } else {
      return currentBook;
    }
  }
  // Post
  async addBook(
    formData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<object | void> {
    try {
      await this.prismaService.book.create({ data: formData });
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
  // Put
  async updateBook(
    id: Book['id'],
    formData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<object | void> {
    const currentBook = this.prismaService.book.findUnique({ where: { id } });
    if (!currentBook) {
      throw new NotFoundException('Book not found');
    } else {
      await this.prismaService.book.update({ where: { id }, data: formData });
      return { success: true };
    }
  }
  // Delete
  async deleteBookById(id: Book['id']): Promise<object | void> {
    const currentBook = this.prismaService.book.findUnique({ where: { id } });
    if (!currentBook) {
      throw new NotFoundException('Book not found');
    } else {
      await this.prismaService.book.delete({ where: { id } });
      return { success: true };
    }
  }
}
