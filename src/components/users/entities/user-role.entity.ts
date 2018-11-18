import 'reflect-metadata';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from './user.entity';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => User, user => user.role)
  user: User;

  @Column('varchar')
  name: string;
}