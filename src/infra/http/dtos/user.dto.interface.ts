export interface UserInputDTO {
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
