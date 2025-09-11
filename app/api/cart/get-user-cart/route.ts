import { prisma } from "@/lib/prisma-client";
import { failure, success } from "@/lib/response";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

export type UserCart = Prisma.UserCartGetPayload<{
  include: {
    items: {
      include: {
        variant: {
          include: {
            pizza: true
          }
        }
      }
    }
  }
}>;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {id} = body;
    
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })

    if (!user) {
      return failure('Помилка отриамння кошика юзера', 401)
    }

    const userCart = await prisma.userCart.findUnique({
      where: {
        userId: user.id
      },
      include: {
        items: {
          include: {
            variant: {
              include: {
                pizza: true
              }
            }
          }
        }
      }
    })

    return success(userCart, 200);
  } catch(e) {
    console.log(e)
    return failure('Помилка отриамння кошика юзера', 401)
  }
}