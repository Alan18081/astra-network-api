import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { BaseEntity } from '../core/base.entity';
import { Note } from '../notes/note.entity';

@Entity()
export class Comment extends BaseEntity {

  @Column('text')
  text: string;

  @Column({ nullable: true })
  userId?: number;

  @Column({ nullable: true })
  noteId?: number;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(type => Note)
  note: Note;

}