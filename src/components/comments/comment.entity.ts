import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { BaseEntity } from '../core/base.entity';

@Entity()
export class Comment extends BaseEntity {

  @Column('text')
  text: string;

  @ManyToOne(type => User)
  @JoinColumn()
  author: User;

}