import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/product.entity';
import { BaseEntity } from '../core/base.entity';

@Entity()
export class Order extends BaseEntity {

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  @ManyToMany(type => Product, product => product.orders)
  products: Product[];

  @Column()
  totalPrice: number;

  @Column()
  totalCount: number;

}