export interface UserCreateInputDTO {
  name: string;
  email: string;
}

export interface UserOutputDTO {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserUpdateInputDTO {
  name: string;
  email: string;
}
