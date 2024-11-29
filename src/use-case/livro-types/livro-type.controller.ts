import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { LivroTypeService } from './livro-type.service';
import { LivroType } from './livro-type.entity';

@Controller('/livro-types')
export class LivroTypeController {
  constructor(private service: LivroTypeService) {}

  @Get()
  findAll(): Promise<LivroType[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<LivroType> {
    const found = await this.service.findById(id);

    if (!found)
      throw new HttpException('Livro type not found', HttpStatus.NOT_FOUND);

    return found;
  }

  @Post()
  create(@Body() livroType: LivroType): Promise<LivroType> {
    return this.service.save(livroType);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() livroType: LivroType,
  ): Promise<LivroType> {
    const found = await this.service.findById(id);

    if (!found)
      throw new HttpException('Livro type not found', HttpStatus.NOT_FOUND);

    livroType.id = found.id;

    return this.service.save(livroType);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const found = await this.service.findById(id);

    if (!found)
      throw new HttpException('Livro type not found', HttpStatus.NOT_FOUND);

    return this.service.remove(id);
  }
}