import { z } from "zod";

const dayRegular = /^(0?[1-9]|[12][0-9]|3[01])$/;
const monthRegular = /^(0?[1-9]|1[0-2])$/;
const yearRegular = /^(19[0-9]{2}|20[0-9]{2}|2100)$/;

export const registrationUserSchem = z.object({
  email: z
    .string()
    .email(
      "Sorry, that email doesn’t look right. Please check it's a proper email."
    )
    .min(1, "Enter your email"),
  password: z
    .string()
    .min(8, "Enter your password")
    .refine((password) => /[a-zA-Z]/.test(password), {
      message: "Password must contain at least one letter",
    })
    .refine((password) => /[\d\W]/.test(password), {
      message: "Password must contain at least one number or symbol",
    }),
  day: z
    .string()
    .regex(dayRegular, "Incorrect day")
    .min(
      1,
      "Oops, that date doesn't look right. Make sure it's a real date written as DD-MM-YYYY e.g. the 5th of June 2009 is 05-06-2009."
    ),
  month: z
    .string()
    .regex(monthRegular, "Incorrect month")
    .min(
      1,
      "Oops, that date doesn't look right. Make sure it's a real date written as DD-MM-YYYY e.g. the 5th of June 2009 is 05-06-2009."
    ),
  year: z
    .string()
    .regex(yearRegular, "Incorrect year")
    .min(
      1,
      "Oops, that date doesn't look right. Make sure it's a real date written as DD-MM-YYYY e.g. the 5th of June 2009 is 05-06-2009."
    ),
});

export const loginUserSchem = z.object({
  email: z
    .string()
    .email(
      "Sorry, that email doesn’t look right. Please check it's a proper email."
    )
    .min(1, "Enter your email"),
  password: z.string().min(8, "Enter your password"),
});
