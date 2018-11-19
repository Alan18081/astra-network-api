import {Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {UserRole} from './user-role.entity';
import {Product} from '../../products/product.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ nullable: true })
  age: number;

  @Column()
  @Index()
  email: string;

  @Column({ select: false, nullable: true })
  password: string;

  @ManyToOne(type => UserRole)
  @JoinColumn()
  role: UserRole;

  @OneToMany(type => Product, product => product.seller)
  products: Product[];

  @Column({ nullable: true })
  googleId: string;
}