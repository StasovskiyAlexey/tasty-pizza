import { prisma } from "@/lib/prisma-client";
import { failure, success } from "@/lib/response";
import { Prisma } from "@prisma/client";

export type PizzaWithCollections = Prisma.PizzaGetPayload<{
  include: {
    collection: {
      include: {
        collection: {
          include: {
            ingredients: {
              include: {
                ingredient: true
              }
            }
          }
        }
      }
    }
  }
}>;

export async function GET() {
  try {
    const allPizzas = await prisma.pizza.findMany({
      include: {
        collection: {
          include: {
            collection: {
              include: {
                ingredients: {
                  include: {
                    ingredient: true
                  }
                }
              }
            }
          }
        }
      }
    });
    return success(allPizzas, 200)
  } catch (e) {
    console.log(e);
    return failure('Помилка отримання продуктів');
  }
}
