import {Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Min, Max, IsEmail} from 'class-validator';
import {UserRole} from './user-role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column()
  @Min(0)
  @Max(100)
  age: number;

  @Column()
  @Index()
  @IsEmail()
  email: string;

  @Column({ select: false })
  password: string;

  @ManyToOne(type => UserRole)
  @JoinColumn()
  role: UserRole;
}