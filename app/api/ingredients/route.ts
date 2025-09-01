import { prisma } from "@/lib/prisma-client";
import { failure, success } from "@/lib/response";

export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany();
    return success(ingredients, 200)
  } catch(e) {
    console.log(e)
    return failure('Помилка отримання інгридиєнтів');
  }
}