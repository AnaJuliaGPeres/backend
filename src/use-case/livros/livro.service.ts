import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Livro } from './livro.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LivroService {
  constructor(
    @InjectRepository(Livro)
    private repository: Repository<Livro>,
  ) {}

  findAll(): Promise<Livro[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<Livro> {
    return this.repository.findOneBy({ id: id });
  }

  save(livro: Livro): Promise<Livro> {
    return this.repository.save(livro);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}