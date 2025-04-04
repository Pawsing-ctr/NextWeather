import { IUser } from "@/app/components/AuthProvider/AuthProvider";
export interface IUserAccountData {
  email: string;
  password: string;
  displayName: string;
  yearOfBirth: string;
}

interface IGetUserData {
  setUser: React.Dispatch<React.SetStateAction<IUserAccountData>>;
  user: IUser | null;
  hidePassword: boolean;
}

export const getUserData = ({
  setUser,
  user,
  hidePassword = true,
}: IGetUserData) => {
  if (user) {
    setUser({
      email: user.email || "",
      password: hidePassword ? "••••••••" : "",
      displayName: user.email.split("@")[0] || "",
      yearOfBirth: user.year || "",
    });
  }
};
