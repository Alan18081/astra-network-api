import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date;

  @Column({ nullable: true, type: 'date' })
  deletedAt?: Date;

}