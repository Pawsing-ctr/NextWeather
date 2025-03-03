import { z } from "zod";

const dayRegular = /^(0?[1-9]|[12][0-9]|3[01])$/;
const monthRegular = /^(0?[1-9]|1[0-2])$/;
const yearRegular = /^(19[0-9]{2}|20[0-9]{2}|2100)$/;

export const registrationUserSchem = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(8, "В пароле должно быть минимум 8 символов"),
  day: z
    .string()
    .regex(dayRegular, "Некорректный день")
    .min(1, "Этот пункт обязателен"),
  month: z
    .string()
    .regex(monthRegular, "Некорректный меяц")
    .min(1, "Этот пункт обязателен"),
  year: z
    .string()
    .regex(yearRegular, "Некорректный год")
    .min(1, "Этот пункт обязателен"),
});
