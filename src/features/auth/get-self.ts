"use server";
import { cookies } from "next/headers";
import { cookieKeys } from "@/constants";
import { firebaseAdminAuth } from "./firebase/admin";

import "server-only";

interface Self {
  uid: string;
  email?: string;
  name?: string;
  picture?: string;
}

export async function getSelf(): Promise<Self | null> {
  const sessionCookie = (await cookies()).get(cookieKeys.session)?.value;

  if (!sessionCookie) return null;

  try {
    const decodedToken = await firebaseAdminAuth.verifySessionCookie(
      sessionCookie,
      true,
    );

    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
    };
  } catch {
    return null;
  }
}
