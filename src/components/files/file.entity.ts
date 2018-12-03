import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../core/base.entity';
import { User } from '../users/user.entity';

@Entity()
export class File extends BaseEntity {

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