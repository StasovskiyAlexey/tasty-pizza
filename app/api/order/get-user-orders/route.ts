import { prisma } from "@/lib/prisma-client";
import { failure, success } from "@/lib/response";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

export type OrderType = Prisma.OrderGetPayload<{
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
}>

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;
    const userOrders = await prisma.order.findMany({
      where: {
        userId
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
    });
    return success(userOrders, 201);
  } catch(e) {
    console.log(e)
    return failure('Помилка в отриманні замовлень користувача', 401)
  }
}