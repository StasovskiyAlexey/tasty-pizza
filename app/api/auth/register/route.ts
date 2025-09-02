import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma-client';
import { failure, success } from '@/lib/response';
import { UserSchema } from '@/schemas/user';
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {username, email, password} = body;

    const result = UserSchema.safeParse(body);

    if (result.error) {
      return failure('Помилка при реєстрації')
    }

    const existingUser = await prisma.user.findFirst({
     where: {
      OR: [
        { username },
        { email }
      ]
  }
    })

    if (existingUser) {
      return failure('Такий юзер вже існує');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword
      }
    })

    return success('Успішно зареєстровано аккаунт', 200)
  } catch (e) {
    console.log(e);
     return failure('Аккаунт не зареєстровано', 401)
  }
}