import { refreshTokenIfNeeded, verifyJWT } from "@/lib/auth";
import { prisma } from "@/lib/prisma-client";
import { failure } from "@/lib/response";
import { NextRequest } from "next/server";
import { success } from "@/lib/response";
import { Prisma } from "@prisma/client";

export type UserWithOrderAndUserCart = Prisma.UserGetPayload<{
  include: {
    orders: {
      include: {
        items: {
          include: {
            pizza: true
          }
        }
      }
    },
    userCart: {
      include: {
        items: true
      }
    }
  }
}>

export async function GET(req: NextRequest) {
  try {
    const token = await req.cookies.get("token")?.value;
    const payload = token ? await verifyJWT(token) : null;
    if (!payload) return failure("Ви неавторизовані", 401);

    await refreshTokenIfNeeded(token!)

    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId as number
      },
      include: {
        orders: {
          include: {
            items: true
          }
        },
        userCart: true,
      }
    })

    if (!user) {
      return failure('Юзера не знайдено', 401)
    }
    return success(user, 200)
  } catch(e) {
    console.log(e)
    return failure('Помилка при пошуку юзера', 401)
  }
}