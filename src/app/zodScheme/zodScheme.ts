import { z } from "zod";

export const registrationUserSchem = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(8, "В пароле должно быть минимум 8 символов"),
  day: z.string().min(1, "Этот пункт обязателен"),
  month: z.string().min(1, "Этот пункт обязателен"),
  year: z.string().min(1, "Этот пункт обязателен"),
});
