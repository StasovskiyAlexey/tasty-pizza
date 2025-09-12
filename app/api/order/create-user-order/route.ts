import { prisma } from "@/lib/prisma-client";
import { failure, success } from "@/lib/response";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {name, phone, street, house, apartment, userId, totalPrice} = body;

    const userCart = await prisma.userCart.findFirst({
      where: {
        userId: userId
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
    
    if (!userCart || userCart.items.length === 0) {
      return failure("Кошик порожній");
    }

    const newOrder = await prisma.order.create({
      data: {
        userId,
        name: name,
        totalPrice: totalPrice,
        phone: phone.toString(),
        street: street,
        house: house.toString(),
        apartment: apartment.toString(),
        items: {
          create: userCart?.items.map(item => ({
            variantId: item.variantId,
            pizzaId: item.variant.pizza.id,  // обязательно указываем pizzaId
            quantity: item.quantity,
            price: item.variant.price
          }))
        }
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
    console.log(newOrder)
    return success(newOrder, 201)
  } catch(e) {
    console.log(e)
    return failure('Помилка оформлення замовлення', 201)
  }
}