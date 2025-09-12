import { prisma } from "@/lib/prisma-client";
import { failure, success } from "@/lib/response";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const {userId} = body;

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        userCart: true
      }
    })

    const deletedCartItems = await prisma.userCartItem.deleteMany({
      where: {
        cartId: user?.id
      }
    })

    console.log(deletedCartItems)
    return success(deletedCartItems, 201)
  } catch(e) {
    console.log(e)
    return failure('Помилка очищення кошика користувача', 401)
  }
}