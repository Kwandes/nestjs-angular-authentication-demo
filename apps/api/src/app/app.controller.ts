import {
  Message,
  SignupRequestDto,
} from '@nestjs-angular-authentication-demo/interfaces';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private userService: UsersService
  ) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getConfidentialData(): Message {
    return { message: 'confidential data' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // uses the passport library logic to obtain the user
    return this.authService.login(req.user);
  }

  @Post('auth/signup')
  async signup(@Body() signupRequestDto: SignupRequestDto) {
    return this.authService.signup(signupRequestDto);
  }
}
