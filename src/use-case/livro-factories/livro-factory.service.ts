import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { LivroFactory } from './livro-factory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LivroFactoryService {
  constructor(
    @InjectRepository(LivroFactory)
    private repository: Repository<LivroFactory>,
  ) {}

  findAll(): Promise<LivroFactory[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<LivroFactory> {
    return this.repository.findOneBy({ id: id });
  }

  save(livroFactory: LivroFactory): Promise<LivroFactory> {
    return this.repository.save(livroFactory);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}