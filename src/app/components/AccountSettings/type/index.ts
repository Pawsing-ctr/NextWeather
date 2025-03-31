import { ReactNode } from "react";

export interface IPersonalDetailsInput {
  id: number;
  title: string;
  className: string;
  buttonInput: string;
  type: string;
  buttonText?: string;
  buttonIMG?: ReactNode;
  pageName?: string;
}

export interface IUserData {
  email: string;
  password: string;
  displayName: string;
  yearOfBirth: string;
}
