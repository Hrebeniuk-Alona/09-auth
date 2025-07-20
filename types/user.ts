
export interface User{
    username: string,
    email: string,
}

export type RegisterRequest = {
    email: string,
    password: string,
}

export type LoginRequest = {
  email: string;
  password: string;
}

export interface UserRes{
  username: string,
  email: string,
  avatar: string
}

export type UpdateUserRequest = {
  userName?: string;
  photoUrl?: string;
};