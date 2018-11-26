import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class EmailVerification {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @Column()
  userId: number;

}