import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from 'typeorm';
import { File } from '../files/file.entity';
import { User } from '../users/user.entity';
import { BaseEntity } from '../core/base.entity';

@Entity()
export class Group extends BaseEntity {

  @Column('varchar')
  name: string;

  @OneToOne(type => File)
  image: string;

  @ManyToOne(type => User, user => user.notes)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(type => User, user => user.groups)
  @JoinTable()
  participants: User[];

}