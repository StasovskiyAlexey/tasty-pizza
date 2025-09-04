import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function signJWT(payload: JWTPayload, exp: string = "7d") {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(exp)
    .sign(secret);
}

export async function verifyJWT(token: string) {
  try {
      const { payload } = await jwtVerify(token, secret);
      return payload;
  } catch {
      return null;
  }
}

export async function setUserCookie(userId: number) {
  const token = await signJWT({ userId });
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}


export async function refreshTokenIfNeeded(token: string) {
  const payload = await verifyJWT(token);
  if (!payload) return null;

  const THRESHOLD = 1000 * 60 * 60 * 24; // 24 hours
  const expiresIn = payload.exp! * 1000 - Date.now();

  if (expiresIn < THRESHOLD) {
      await setUserCookie(payload.userId as number)
  }
  return null;
}