import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivroType } from './livro-type.entity';
import { LivroTypeService } from './livro-type.service';
import { LivroTypeController } from './livro-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LivroType])],
  providers: [LivroTypeService],
  controllers: [LivroTypeController],
})
export class LivroTypeModule {}