"use server";
import { getAuthSelf, getSelf } from "./get-self";

/**
 * ログインしているユーザーがオンボーディングを完了しているかどうかを取得する
 * @returns
 */
export async function getSelfIsCompletedOnboarding(): Promise<boolean> {
  const authSelf = await getAuthSelf();
  if (!authSelf) return false;

  const self = await getSelf();
  if (!self) return false;

  return true;
}
