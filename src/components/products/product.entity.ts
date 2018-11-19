import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../users/entities/user.entity';

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column('text')
  description: string;

  @ManyToOne(type => User, user => user.products)
  seller: User;

  @Column('varchar')
  image: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

}