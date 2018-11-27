import { BaseEntity, Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

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