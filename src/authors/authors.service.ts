import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Author } from '@prisma/client';
@Injectable()
export class AuthorsService {
  constructor(private prismaService: PrismaService) {};
  public getAll(): Promise<Author[]> {
    return this.prismaService.author.findMany({});
  }
}
