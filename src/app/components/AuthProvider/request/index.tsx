import $api from "@/app/api/$api";

// Пример разбора запросов на функциии СДЕЛАТЬ!!!
export const loginRequest = async (
  path: string,
  credentials: {
    email: string;
    password: string;
  }
) => {
  try {
    return await $api.post(path, credentials);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    return error;
  }
};

export const registrationRequest = async (
  path: string,
  userData: {
    email: string;
    password: string;
    birthDate?: { day: string; month: string; year: string };
  },
  setError: (value: React.SetStateAction<string | null>) => void
) => {
  try {
    return await $api.post(path, userData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Ошибка регистрации:", error.response?.data || error.message);
    setError(
      error.response?.data?.message || "An error occurred during registration"
    );
    throw error;
  }
};

export const logoutRequest = async (
  path: string,
  setError: (value: React.SetStateAction<string | null>) => void
) => {
  try {
    return await $api.post(path);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    setError(
      error.response?.data?.message || "An error occurred during logout"
    );
    throw error;
  }
};
