import { Column, Entity, ManyToOne } from 'typeorm';
import { Product } from '../products/product.entity';
import { BaseEntity } from '../core/base.entity';

@Entity()
export class File extends BaseEntity {

  @Column()
  url: string;

  @Column()
  publicId: string;

  @ManyToOne(type => Product)
  product: Product;

}