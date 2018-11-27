import {Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {UserRole} from './entities/user-role.entity';
import {Product} from '../products/product.entity';
import {BaseEntity} from '../core/base.entity';

@Entity()
export class User extends BaseEntity {

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ nullable: true })
  age: number;

  @Column()
  @Index()
  email: string;

  @Column({ nullable: true })
  password: string;

  @ManyToOne(type => UserRole)
  @JoinColumn()
  role: UserRole;

  @OneToMany(type => Product, product => product.seller)
  products: Product[];

  @Column({ nullable: true })
  googleId: string;

  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;

  @Column({ type: 'boolean', default: false })
  phoneVerified: boolean;
}