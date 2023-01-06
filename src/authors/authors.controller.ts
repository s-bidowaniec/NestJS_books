import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  ParseUUIDPipe,
  Delete,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDTO } from './dtos/create-author.dto';
import { UpdateAuthorDTO } from './dtos/update-author.dto';
@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}
  @Get('/')
  getAll() {
    return this.authorsService.getAll();
  }
  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.authorsService.getById(id);
  }
  @Post('/')
  addNew(@Body() formData: CreateAuthorDTO) {
    return this.authorsService.addNew(formData);
  }
  @Put('/:id')
  updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() formData: UpdateAuthorDTO,
  ) {
    return this.authorsService.updateAuthorById(id, formData);
  }
  @Delete('/:id')
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.authorsService.deleteAuthorByID(id);
  }
}
