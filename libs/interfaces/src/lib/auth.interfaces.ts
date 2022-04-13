export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface SignupRequestDto {
  email: string;
  password: string;
}

export interface SignupResponse {
  accessToken: string;
}
