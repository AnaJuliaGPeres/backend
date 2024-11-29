import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { LivroModel } from './livro-model.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LivroModelService {
  constructor(
    @InjectRepository(LivroModel)
    private repository: Repository<LivroModel>,
  ) {}

  findAll(): Promise<LivroModel[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<LivroModel> {
    return this.repository.findOneBy({ id: id });
  }

  save(livroModel: LivroModel): Promise<LivroModel> {
    return this.repository.save(livroModel);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}