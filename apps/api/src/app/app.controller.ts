import {
  Message,
  Role,
  ISignupRequestDto,
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
import { Roles } from './auth/roles.decorator';
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

  @UseGuards(JwtAuthGuard)
  @Get('user')
  @Roles(Role.User)
  getUserData(): Message {
    return { message: 'User data' };
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get('admin')
  getAdminData(): Message {
    return { message: 'Admin data' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // uses the passport library logic to obtain the user
    return this.authService.login(req.user);
  }

  @Post('auth/signup')
  async signup(@Body() signupRequestDto: ISignupRequestDto) {
    return this.authService.signup(signupRequestDto);
  }
}
