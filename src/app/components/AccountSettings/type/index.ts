import { TranslationKeys } from "@/app/context/ui/SettingsContext";
import { ReactNode } from "react";

interface IEditPage {
  editPageTitle: string;
  editPageDescription?: string;
}

export interface IPersonalDetailsInput {
  id: number;
  title: TranslationKeys;
  className: string;
  classNameEdit?: string;
  buttonInput: string;
  type: string;
  buttonText: TranslationKeys;
  buttonIMG?: ReactNode;
  pageName?: string;
  editPage?: IEditPage;
  placeholder?: string;
}

export interface IUserData {
  email: string;
  password: string;
  displayName: string;
  yearOfBirth: string;
}
