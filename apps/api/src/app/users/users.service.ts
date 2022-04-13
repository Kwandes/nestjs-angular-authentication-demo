import {
  IUser,
  SignupRequestDto,
} from '@nestjs-angular-authentication-demo/interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { email: email } });
  }

  async create(signupRequestDto: SignupRequestDto): Promise<IUser> {
    const { email, password } = signupRequestDto;
    const newUser = this.userRepo.create({ email: email, password: password });
    return this.userRepo.save(newUser);
  }
}
