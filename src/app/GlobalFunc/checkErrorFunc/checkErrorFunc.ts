/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export const handleSchemeCheckError = (
  schema: z.ZodSchema<any>,
  data: Record<string, any>,
  setErrors: (errors: Record<string, string>) => void
) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    result.error.errors.forEach((err) => {
      if (typeof err.path[0] === "string") {
        fieldErrors[err.path[0]] = err.message;
      }
    });
    console.log("Ошибка при отправке данных");
    setErrors(fieldErrors);
  } else {
    setErrors({});
  }
  return result.success;
};
