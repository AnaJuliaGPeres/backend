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
import { LivroFactoryService } from './livro-factory.service';
import { LivroFactory } from './livro-factory.entity';

@Controller('/livro-factories')
export class LivroFactoryController {
  constructor(private service: LivroFactoryService) {}

  @Get()
  findAll(): Promise<LivroFactory[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<LivroFactory> {
    const found = await this.service.findById(id);

    if (!found)
      throw new HttpException(
        'Livro factory not found',
        HttpStatus.NOT_FOUND,
      );

    return found;
  }

  @Post()
  create(@Body() livroFactory: LivroFactory): Promise<LivroFactory> {
    return this.service.save(livroFactory);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() livroFactory: LivroFactory,
  ): Promise<LivroFactory> {
    const found = await this.service.findById(id);

    if (!found)
      throw new HttpException(
        'Livro factory not found',
        HttpStatus.NOT_FOUND,
      );

    livroFactory.id = found.id;

    return this.service.save(livroFactory);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const found = await this.service.findById(id);

    if (!found)
      throw new HttpException(
        'Livro factory not found',
        HttpStatus.NOT_FOUND,
      );

    return this.service.remove(id);
  }
}