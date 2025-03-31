import { IUserData } from "../type";

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
};

export const getInputValue = (inputId: number, userData: IUserData) => {
  switch (inputId) {
    case 1:
      return userData.email;
    case 2:
      return userData.password;
    case 3:
      return userData.displayName;
    case 4:
      return userData.yearOfBirth;
    default:
      return "";
  }
};
