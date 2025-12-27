"use server";
import { cache } from "react";
import type { AuthSelf, Self } from "@/entities/self";
import { getAuthSelf, getSelf } from "./get-self";

export enum LoginStatus {
  NotLoggedIn = "NotLoggedIn",
  IncompleteOnboarding = "IncompleteOnboarding",
  LoggedIn = "LoggedIn",
}

/**
 * 現在のユーザーのログイン状態を取得する
 * - 未ログインの場合: `{ status: LoginStatus.NotLoggedIn }`
 * - ログインしているがオンボーディング未完了の場合: `{ status: LoginStatus.IncompleteOnboarding, self: AuthSelf }`
 * - ログインしておりオンボーディング完了の場合: `{ status: LoginStatus.LoggedIn, self: Self }`
 */
export const getSelfLoginStatus = cache(
  async (): Promise<
    | { status: LoginStatus.NotLoggedIn }
    | {
        status: LoginStatus.IncompleteOnboarding;
        self: AuthSelf;
      }
    | {
        status: LoginStatus.LoggedIn;
        self: Self;
      }
  > => {
    const authSelf = await getAuthSelf();
    if (!authSelf) {
      return { status: LoginStatus.NotLoggedIn };
    }

    const self = await getSelf();
    if (!self) {
      return { status: LoginStatus.IncompleteOnboarding, self: authSelf };
    }

    return { status: LoginStatus.LoggedIn, self };
  },
);
