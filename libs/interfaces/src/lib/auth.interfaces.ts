import { Role } from './role.enum';

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  role: Role;
}

export interface SignupRequestDto {
  email: string;
  password: string;
}

export interface SignupResponse {
  accessToken: string;
  role: Role;
}
