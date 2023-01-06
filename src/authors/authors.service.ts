import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Author } from '@prisma/client';
@Injectable()
export class AuthorsService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Author[]> {
    return this.prismaService.author.findMany({});
  }

  public async getById(id: Author['id']): Promise<Author | null> {
    const currentAuthor = await this.prismaService.author.findUnique({
      where: { id },
    });
    if (!currentAuthor) {
      throw new NotFoundException('Author not found');
    } else {
      return currentAuthor;
    }
  }

  public async addNew(authorData: Omit<Author, 'id'>): Promise<object | void> {
    try {
      await this.prismaService.author.create({ data: authorData });
      return { success: true };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Author allready exist');
      } else {
        throw error;
      }
    }
  }

  public async updateAuthorById(
    id: Author['id'],
    authorData: Omit<Author, 'id'>,
  ) {
    const currentAuthor: Author | null =
      await this.prismaService.author.findUnique({ where: { id } });
    if (!currentAuthor) {
      throw new NotFoundException('Author not found');
    } else {
      await this.prismaService.author.update({
        where: { id },
        data: authorData,
      });
      return { success: true };
    }
  }

  public async deleteAuthorByID(id: Author['id']) {
    const currentAuthor: Author | null =
      await this.prismaService.author.findUnique({ where: { id } });
    if (!currentAuthor) {
      throw new NotFoundException('Author not found');
    } else {
      await this.prismaService.author.delete({
        where: { id },
      });
      return { success: true };
    }
  }
}
