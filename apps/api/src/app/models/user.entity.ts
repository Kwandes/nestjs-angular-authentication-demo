import { IUser } from '@nestjs-angular-authentication-demo/interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';

@Entity('users')
export class User extends Base implements IUser {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ length: 254, unique: true })
  email: string;

  @Column({ length: 120 })
  password: string;
}
