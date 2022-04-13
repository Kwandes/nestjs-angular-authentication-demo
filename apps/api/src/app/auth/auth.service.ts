import { IUser } from '@nestjs-angular-authentication-demo/interfaces';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: IUser) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
