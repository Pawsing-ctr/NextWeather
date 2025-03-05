import $api from "../$api";
import { INewUser } from "./types";
import { userPath } from "./userPath";

export interface ICreateUserData {
  email: string;
  password: string;
  day: string;
  month: string;
  year: string;
}

export const createUser = async (userData: ICreateUserData) => {
  try {
    const response = await $api.post(userPath.ALL_USERS, userData);
    return response.data;
  } catch (error) {
    console.error("Ошибка при создании пользователя:");
    throw error;
  }
};

export const getUsers = async (): Promise<INewUser[]> => {
  try {
    const response = await $api.get<INewUser[]>(userPath.ALL_USERS);
    return response.data;
  } catch (error) {
    console.error("Ошибка получение пользователей:", error);
    throw error;
  }
};
