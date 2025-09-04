import { prisma } from "@/lib/prisma-client";
import { failure, success } from "@/lib/response";
import { UserSchema } from "@/schemas/user";
import { NextRequest } from "next/server";
import bcrypt from 'bcrypt'
import { setUserCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {username, password} = body;

    const result = UserSchema.safeParse(body)

    if (result.error) {
      failure(result.error.message || "Неправильний формат даних", 400);
    }

    const user = await prisma.user.findFirst({
      where: {
        username: username
      }
    })

    if (!user) {
      return failure('Такого юзера не існує', 401)
    }

    if (!(bcrypt.compare(password, user?.password as unknown as string))) {
      return failure("Невірний пароль.", 401);
    }

    await setUserCookie(user?.id as unknown as number);

    return success('Успішний вхід до аккаунту', 200)
  } catch(e) {
    console.log(e);
    return failure('Помилка при вході в аккаунт', 401)
  }
}