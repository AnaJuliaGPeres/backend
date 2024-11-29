import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LivroType } from '../livro-types/livro-type.entity';
import { LivroModel } from '../livro-models/livro-model.entity';

@Entity('u4-livro')
export class Livro {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ nullable: false })
  photo: string;

  @Column({ name: 'year-factory', nullable: false })
  yearFactory: number;

  @Column({ name: 'year-model', nullable: false })
  yearModel: number;

  @Column({
    name: 'price',
    type: 'decimal',
    nullable: false,
    precision: 10,
    scale: 2,
  })
  priceRent: number;

  @ManyToOne(() => LivroType, { eager: true, nullable: false })
  @JoinColumn({ name: 'type-id' })
  type: LivroType;

  @ManyToOne(() => LivroModel, { eager: true, nullable: false })
  @JoinColumn({ name: 'model-id' })
  model: LivroModel;

  @CreateDateColumn({ name: 'created-at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated-at' })
  updatedAt: Date;
}