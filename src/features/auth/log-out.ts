"use server";
import { cookies } from "next/headers";
import { cookieKeys } from "@/constants";
import { firebaseAdminAuth } from "./firebase/admin";

/**
 * ログアウト
 * Firebase Authentication のセッションを終了し、クライアントの session cookie を削除する。
 * @param uid
 */
export async function logOut(uid: string) {
  await firebaseAdminAuth.revokeRefreshTokens(uid);

  (await cookies()).delete(cookieKeys.session);
}
