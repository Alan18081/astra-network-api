import { Column, Entity, JoinColumn, ManyToOne, ObjectID, ObjectIdColumn } from 'typeorm';
import { BaseEntity } from '../core/base.entity';
import { User } from '../users/user.entity';

@Entity()
export class File extends BaseEntity {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  url: string;

  @Column({ nullable: true })
  publicId: string;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'userId' })
  user: User;


}