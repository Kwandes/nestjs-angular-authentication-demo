export interface Message {
  message: string;
}

export interface IBase {
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface IUser extends IBase {
  userId: string;
  email: string;
  password: string;
}
