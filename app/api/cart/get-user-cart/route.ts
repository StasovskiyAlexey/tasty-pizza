import { prisma } from "@/lib/prisma-client";
import { failure, success } from "@/lib/response";
import { NextRequest } from "next/server";

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
            product: true
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