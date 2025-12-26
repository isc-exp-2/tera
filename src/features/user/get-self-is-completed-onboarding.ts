"use server";
import { cache } from "react";
import { getAuthSelf, getSelf } from "./get-self";

/**
 * ログインしているユーザーがオンボーディングを完了しているかどうかを取得する
 * @returns
 */
export const getSelfIsCompletedOnboarding = cache(
  async (): Promise<boolean> => {
    const authSelf = await getAuthSelf();
    if (!authSelf) return false;

    const self = await getSelf();
    if (!self) return false;

    return true;
  },
);
