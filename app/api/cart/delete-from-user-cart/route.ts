import { prisma } from "@/lib/prisma-client";
import { failure, success } from "@/lib/response";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const {productId, cartId, id} = body;

    console.log(productId, cartId, id)

    if (!productId || !cartId) {
      return failure('Немає данних');
    }

    const userCartItem = await prisma.userCartItem.delete({
      where: {
        id: id,
        cartId: cartId,
        productId: productId,
      }
    })
    console.log(userCartItem)

    return success('Успішно видалено продукт', 201)
  } catch(e) {
    console.log(e);
    return failure('Помилка видалення продукта юзера')
  }
}