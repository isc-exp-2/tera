"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cookieKeys, urls } from "@/constants";
import { firebaseAdminAuth } from "@/firebase/admin";
import { getAuthSelf } from "./get-self";

/**
 * ログアウト。
 * Firebase Authentication のセッションを終了し、クライアントの session cookie を削除する。
 * @param redirectTo ログアウト後にリダイレクトする URL (デフォルト: ログインページ)
 */
export async function logOut(redirectTo: string = urls.login) {
  const authSelf = await getAuthSelf();
  if (authSelf) await firebaseAdminAuth.revokeRefreshTokens(authSelf.uid);

  (await cookies()).delete(cookieKeys.session);

  redirect(redirectTo);
}
