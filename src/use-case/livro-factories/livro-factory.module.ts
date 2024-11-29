import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivroFactoryController } from './livro-factory.controller';
import { LivroFactory } from './livro-factory.entity';
import { LivroFactoryService } from './livro-factory.service';

@Module({
  imports: [TypeOrmModule.forFeature([LivroFactory])],
  providers: [LivroFactoryService],
  controllers: [LivroFactoryController],
})
export class LivroFactoryModule {}