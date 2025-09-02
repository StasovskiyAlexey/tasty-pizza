import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().int().positive().optional(), // т.к. генерируется автоматически
  username: z.string().min(3, "Ім'я повинно містити мінімум 3 символи"),
  email: z.string().email("Некоректний email"),
  password: z.string().min(6, "Пароль повинен містити мінімум 6 символів"),
  createdAt: z.date().optional(), // генерируется автоматически
});