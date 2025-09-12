import { prisma } from "@/lib/prisma-client";
import { failure, success } from "@/lib/response";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {status, userId, orderId} = body;
    const updatedOrderStatus = await prisma.order.update({
      where: {
        id: orderId,
        userId: userId
      },
      data: {
        status: status === 'completed' ? "COMPLETED" : "CANCELED"
      }
    })
    return success(updatedOrderStatus, 201)
  } catch(e) {
    return failure('Помилка', 401)
  }
}