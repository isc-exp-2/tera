"use server";
import { cookies } from "next/headers";
import { cookieKeys } from "@/constants";
import { firebaseAdminAuth } from "./firebase/admin";

/**
 * Firebase Authentication を使用して session cookie を発行し、クライアントにセットする
 * このアプリケーションではユーザー登録に関しては Google ログイン -> 新規登録（情報の追加、Users コレクションに情報が保存される）というフローを踏むが、Google ログインまでを実行する。
 * 正確には、クライアント側で Firebase Authentication の Google ログインを実行し、その結果得られる ID トークンをSession Cookie に変換してセットする。
 * @param idToken
 */
export async function logIn(idToken: string) {
  await firebaseAdminAuth.verifyIdToken(idToken);

  const expiresIn = 60 * 60 * 24 * 5; // 5 days

  const sessionCookie = await firebaseAdminAuth.createSessionCookie(idToken, {
    expiresIn: expiresIn * 1000,
  });

  (await cookies()).set(cookieKeys.session, sessionCookie, {
    httpOnly: true,
    secure: true,
    maxAge: expiresIn,
    sameSite: "lax",
    path: "/",
  });
}
