import { ReactNode } from "react";

interface IEditPage {
  editPageTitle: string;
  editPageDescription?: string;
}

export interface IPersonalDetailsInput {
  id: number;
  title: string;
  className: string;
  buttonInput: string;
  type: string;
  buttonText?: string;
  buttonIMG?: ReactNode;
  pageName?: string;
  editPage?: IEditPage;
}

export interface IUserData {
  email: string;
  password: string;
  displayName: string;
  yearOfBirth: string;
}
