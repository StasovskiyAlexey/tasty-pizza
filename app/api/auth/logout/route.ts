import { failure } from "@/lib/response"
import { NextRequest } from "next/server"
import { success } from "@/lib/response";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token")

    return success('Ви успішно вийшли з аккаунту', 200)
  } catch(e) {
    console.log(e)
    return failure('Помилка для виходу')
  }
}