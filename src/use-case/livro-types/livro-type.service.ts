import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { LivroType } from './livro-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LivroTypeService {
  constructor(
    @InjectRepository(LivroType)
    private repository: Repository<LivroType>,
  ) {}

  findAll(): Promise<LivroType[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<LivroType> {
    return this.repository.findOneBy({ id: id });
  }

  save(vehicleType: LivroType): Promise<LivroType> {
    return this.repository.save(vehicleType);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}