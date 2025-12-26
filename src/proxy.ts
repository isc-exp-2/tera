import { type NextRequest, NextResponse } from "next/server";
import { urls } from "./constants";
import { getRoleLevel, Role } from "./entities/role";
import { getAuthSelf, getSelf } from "./features/user/get-self";
import { getSelfIsCompletedOnboarding } from "./features/user/get-self-is-completed-onboarding";
import { unreachable } from "./lib/unreachable";

export const config = {
  matcher: ["/((?!login))"],
};

export async function proxy(req: NextRequest) {
  const authSelf = await getAuthSelf();
  // 未ログインの場合、ログインページへリダイレクトする
  if (!authSelf) {
    return NextResponse.redirect(new URL(urls.login, req.url));
  }

  const isCompletedOnboarding = await getSelfIsCompletedOnboarding();
  // オンボーディングが完了していない場合、オンボーディングページへリダイレクトする
  if (!isCompletedOnboarding && req.nextUrl.pathname !== urls.onboarding) {
    return NextResponse.redirect(new URL(urls.onboarding, req.url));
  }

  const self = await getSelf();
  if (!self) {
    unreachable("認証済みユーザーなのに Self が取得できない");
  }

  // 管理者専用ページにアクセスしようとした場合、権限をチェックする
  if (urls.managerOnlyPages.includes(req.nextUrl.pathname)) {
    const selfRoleLevel = getRoleLevel(self.role);
    const managerRoleLevel = getRoleLevel(Role.Leader);

    if (selfRoleLevel < managerRoleLevel) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}
