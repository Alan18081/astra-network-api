import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class UserHash {

  @ObjectIdColumn()
  id: ObjectID;

  @Column('varchar')
  hash: string;

  @Column()
  userId: number;

}