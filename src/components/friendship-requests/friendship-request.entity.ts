import { Column, Entity, JoinColumn, ManyToOne, ObjectID, ObjectIdColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../core/base.entity';
import { User } from '../users/user.entity';

@Entity()
export class FriendshipRequest extends BaseEntity {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  receiverId: number;

  @OneToOne(type => User)
  @JoinColumn({ name: 'receiverId' })
  receiver: User;

  @Column()
  senderId: number;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column({ type: 'varchar', nullable: true, length: 50 })
  message?: string;

  constructor(data: Partial<FriendshipRequest>) {
    super();
    Object.assign(this, data);
  }


}