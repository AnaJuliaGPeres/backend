import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivroFactoryModule } from './use-case/livro-factories/livro-factory.module';
import { LivroModelModule } from './use-case/livro-models/livro-model.module';
import { LivroTypeModule } from './use-case/livro-types/livro-type.module';
import { LivroModule } from './use-case/livros/livro.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      autoLoadEntities: true,
      migrations: [`${__dirname}/migration/*.{ts,js}`],
      migrationsRun: true,
      migrationsTableName: 'u4-migration',
    }),
    LivroFactoryModule,
    LivroModelModule,
    LivroTypeModule,
    LivroModule,
  ],
})
export class AppModule {}