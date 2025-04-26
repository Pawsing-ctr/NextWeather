import { AxiosResponse } from "axios";

export interface IUser {
  id: number;
  email: string;
  role: string;
  year?: string;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IAuthContextType {
  login: (credentials: ILoginCredentials) => Promise<AxiosResponse>;
  register: (
    email: string,
    password: string,
    birthDate?: { day: string; month: string; year: string }
  ) => Promise<void>;
  logout: () => Promise<void>;
  user: IUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}
