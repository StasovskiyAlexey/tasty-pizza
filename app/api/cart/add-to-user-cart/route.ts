import { prisma } from "@/lib/prisma-client";
import { failure, success } from "@/lib/response";
import { UserCartItem } from "@prisma/client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {userId, variantId, quantity = 1} = body; // Достаем входные данные
    console.log(userId, variantId)
    if (!userId || !variantId) { // Проверяем данные если их нет возвращаем ошибку
      return failure('Немає ID юзера або ID продукту')
    }

    let userCart = await prisma.userCart.findUnique({ // Находим корзину пользователя
      where: {
        userId: userId
      }
    })

    console.log(userCart)

    if (!userCart) { // Если не находим, создаем новую корзину для пользователя(на всякий случай)
      await prisma.userCart.create({
        data: {
          userId: userId
        }
      })
    }

    const existingItem = await prisma.userCartItem.findUnique({ // Текущий елемент, обновляем
      where: {
        cartId_variantId: {
          cartId: userCart?.id as number,
          variantId: variantId
        }
      },
    })

    let updatedItem: UserCartItem;

    if (existingItem) {
      // Если товар есть — увеличиваем количество
      updatedItem = await prisma.userCartItem.update({
        where: {
          cartId_variantId: {
            cartId: userCart?.id as number,
            variantId,
          },
        },
        data: {
          quantity: {
            increment: quantity,
          }
        },
      });
    } else {
      // Если товара нет — добавляем новый
      updatedItem = await prisma.userCartItem.create({
        data: {
          cartId: userCart?.id,
          variantId,
          quantity
        },
      });
    }
    return success('Продукт додано до кошика', 200)
  } catch(e) {
    console.log(e)
    return failure('Помилка додавання до кошику', 401)
  }
}