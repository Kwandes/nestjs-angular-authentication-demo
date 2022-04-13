import {
  IUser,
  LoginResponse,
  SignupRequestDto,
  SignupResponse,
} from '@nestjs-angular-authentication-demo/interfaces';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(loginRequestDto): Promise<any> {
    const { email, password } = loginRequestDto;
    const user = await this.usersService.findOne(email);
    if (user && (await this.compareHashes(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: IUser): Promise<LoginResponse> {
    const payload = { email: user.email, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signup(signupRequestDto: SignupRequestDto): Promise<SignupResponse> {
    const { email, password } = signupRequestDto;
    const hashedPassword = await this.encodePassword(password);
    const user = await this.usersService.create({
      email: email,
      password: hashedPassword,
    });
    return await this.login(user);
  }

  /**
   *
   * @param password
   * @returns
   */
  async encodePassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  /**
   *
   * @param password
   * @param hash
   * @returns
   */
  async compareHashes(password, hash): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
