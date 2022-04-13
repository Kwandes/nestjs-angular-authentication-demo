import { Injectable } from '@nestjs/common';
import { Message } from '@nestjs-angular-authentication-demo/interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
