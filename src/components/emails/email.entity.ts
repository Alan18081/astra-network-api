import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import {BaseEntity} from '../core/base.entity';

@Entity()
export class Email extends BaseEntity {

  @Column('varchar')
  title: string;

  @Column()
  template: string;

  @ManyToOne(type => User)
  sender: User;

  @ManyToMany(type => User)
  receivers: User[];

}