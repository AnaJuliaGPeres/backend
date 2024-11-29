import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivroModel } from './livro-model.entity';
import { LivroModelService } from './livro-model.service';
import { LivroModelController } from './livro-model.controller';
import { LivroFactory } from '../livro-factories/livro-factory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LivroFactory, LivroModel])],
  providers: [LivroModelService],
  controllers: [LivroModelController],
})
export class LivroModelModule {}