import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livro } from './livro.entity';
import { LivroService } from './livro.service';
import { LivroController } from './livro.controller';
import { SupabaseModule } from 'src/@libs/supabase/supabase.module';

@Module({
  imports: [TypeOrmModule.forFeature([Livro]), SupabaseModule],
  providers: [LivroService],
  controllers: [LivroController],
})
export class LivroModule {}