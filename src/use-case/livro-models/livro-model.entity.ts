import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { LivroFactory } from '../livro-factories/livro-factory.entity';
  
  @Entity('u4-model')
  export class LivroModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ length: 60, nullable: false })
    name: string;
  
    @ManyToOne(() => LivroFactory, { eager: true, nullable: false })
    @JoinColumn({ name: 'factory-id' })
    factory: LivroFactory;
  
    @CreateDateColumn({ name: 'created-at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated-at' })
    updatedAt: Date;
  }