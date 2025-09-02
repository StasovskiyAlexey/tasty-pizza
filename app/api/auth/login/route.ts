import { prisma } from "@/lib/prisma-client";
import { failure, success } from "@/lib/response";
import { UserSchema } from "@/schemas/user";
import { NextRequest } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {username, password} = body;

  const result = UserSchema.safeParse(body)

  if (result.error) {
    failure(result.error.message || "Неправильний формат даних", 400);
  }

  const user = await prisma.user.findUnique({
    where: {
      username: username
    }
  })

  console.log(password, user?.password)

  if (!(bcrypt.compare(password, user?.password as unknown as string))) {
    return failure("Невірний пароль.", 401);
  }

  if (user) {
    return success('Успішний вхід до аккаунту', 200)
  }

  if (!user) {
    return failure('Такого юзера не існує', 401)
  }
}