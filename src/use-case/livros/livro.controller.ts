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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LivroService } from './livro.service';
import { Livro } from './livro.entity';
import { SupabaseService } from 'src/@libs/supabase/supabase.service';

@Controller('/livros')
export class LivroController {
  constructor(
    private readonly service: LivroService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Get()
  findAll(): Promise<Livro[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Livro> {
    const found = await this.service.findById(id);

    if (!found)
      throw new HttpException('Livro not found', HttpStatus.NOT_FOUND);

    return found;
  }

  @Post()
  create(@Body() livro: Livro): Promise<Livro> {
    return this.service.save(livro);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() livro: Livro,
  ): Promise<Livro> {
    const found = await this.service.findById(id);

    if (!found)
      throw new HttpException('Livro not found', HttpStatus.NOT_FOUND);

    livro.id = found.id;

    return this.service.save(livro);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const found = await this.service.findById(id);

    if (!found)
      throw new HttpException('Livro not found', HttpStatus.NOT_FOUND);

    return this.service.remove(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    
    if (!file) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }

    const result = await this.supabaseService.upload(file);

    if (!result) {
      throw new HttpException(
        'Unable to upload file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return result;
  }
}