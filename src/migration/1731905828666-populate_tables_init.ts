import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateTablesInit1731905820666 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            INSERT INTO public."u4-factory"(name) VALUES
                ('Companhia das letras'),
                ('Galera'),
                ('Alta Life'),
                ('Alaude'),
                ('Alta Books'),
                ('Objetiva'),
                ('Buzz Editora'),
                ('Arqueiro'),
                ('DarkSide'),
                ('Intrinsica');
                
            INSERT INTO public."u4-type"(name) VALUES
                ('Livros academicos'),
                ('Livros diversos'),
                ('Livros estrangeiros');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            DELETE FROM public."u4-type";
            DELETE FROM public."u4-factory";
    `);
  }
}