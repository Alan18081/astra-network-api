import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { File } from '../files/file.entity';
import { Comment } from '../comments/comment.entity';

export class BaseNote extends BaseEntity {

  @Column('varchar')
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToMany(type => File)
  @JoinTable()
  files: File[];

  @OneToMany(type => Comment, comment => comment.note)
  comments: Comment[];

}