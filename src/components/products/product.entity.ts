import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../users/entities/user.entity';
import {File} from '../files/file.entity';

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(type => User, user => user.products)
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

}