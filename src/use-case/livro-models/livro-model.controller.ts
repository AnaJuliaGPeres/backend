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
import { LivroModelService } from './livro-model.service';
import { LivroModel } from './livro-model.entity';

@Controller('/livro-models')
export class LivroModelController {
  constructor(private service: LivroModelService) {}

  @Get()
  findAll(): Promise<LivroModel[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<LivroModel> {
    const found = await this.service.findById(id);

    if (!found)
      throw new HttpException('Livro model not found', HttpStatus.NOT_FOUND);

    return found;
  }

  @Post()
  create(@Body() livroModel: LivroModel): Promise<LivroModel> {
    return this.service.save(livroModel);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() livroModel: LivroModel,
  ): Promise<LivroModel> {
    const found = await this.service.findById(id);

    if (!found)
      throw new HttpException('Livro model not found', HttpStatus.NOT_FOUND);

    livroModel.id = found.id;

    return this.service.save(livroModel);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const found = await this.service.findById(id);

    if (!found)
      throw new HttpException('Livro model not found', HttpStatus.NOT_FOUND);

    return this.service.remove(id);
  }
}