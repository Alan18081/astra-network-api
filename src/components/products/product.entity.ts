import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {User} from '../users/entities/user.entity';
import {File} from '../files/file.entity';
import { Order } from '../orders/order.entity';
import { BaseEntity } from '../core/base.entity';

@Entity()
export class Product extends BaseEntity {

  @Column('varchar')
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(type => User, user => user.products)
  @JoinColumn()
  seller: User;

  @OneToOne(type => File)
  @JoinColumn()
  mainImage: File;

  @OneToMany(type => File, image => image.product)
  images: File[];

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToMany(type => Order, order => order.products)
  orders: Order[];

}