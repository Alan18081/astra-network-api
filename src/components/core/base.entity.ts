import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  @Column({ default: false })
  deleted?: boolean;


}