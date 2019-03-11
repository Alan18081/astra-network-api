import { Column, Entity, Index, JoinColumn, ObjectID, ObjectIdColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import {User} from '../users/user.entity';

@Entity()
export class RefreshToken {

  @ObjectIdColumn()
  id: ObjectID;

  @Column('varchar')
  @Index()
  token: string;

  @Column()
  userId: number;

  @OneToOne(type => User)
  @JoinColumn({ name: 'userId' })
  user: User;

}