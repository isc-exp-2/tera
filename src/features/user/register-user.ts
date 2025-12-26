"use server";
import { collectionKeys, googleLoginAllowedDomain } from "@/constants";
import { Role } from "@/entities/role";
import { type Self, UserInfo } from "@/entities/self";
import v from "@/entities/valibot";
import { adminFirestore } from "@/firebase/admin";
import { getAuthSelf } from "./get-self";
import { getSelfIsCompletedOnboarding } from "./get-self-is-completed-onboarding";

/**
 * 新規ユーザー登録を行う
 * すでにオンボーディングが完了している場合、ログインしていない場合は null を返す
 * この関数から null が返ってきた場合は常にホームにリダイレクトすることが期待される。ログインしていない null の場合はホームにリダイレクトされた後に proxy.ts によってログインページにリダイレクトされるはず。
 */
export async function registerSelf(
  unsafeUserInfo: Omit<UserInfo, "role">,
): Promise<Self | null> {
  const userInfo = v.parse(UserInfo, { ...unsafeUserInfo, role: Role.Member }); // デフォルトで Member ロールを付与

  const authSelf = await getAuthSelf();
  if (!authSelf) return null;

  // 許可されていないメールドメインの場合、エラーをスローする
  // クライアントサイドで制限しているため、正規のログインルートでは発生しないが、セキュリティのためサーバーサイドでもチェックする
  if (authSelf.email.split("@").pop() !== googleLoginAllowedDomain) {
    throw new NotAllowedEmailDomainError();
  }

  const selfIsCompletedOnboarding = await getSelfIsCompletedOnboarding();
  if (selfIsCompletedOnboarding) return null;

  // Users コレクションに情報を登録する
  await adminFirestore
    .collection(collectionKeys.users)
    .doc(authSelf.uid)
    .set(userInfo);

  return {
    ...authSelf,
    ...userInfo,
  };
}

class NotAllowedEmailDomainError extends Error {
  constructor() {
    super("Not allowed email domain");
    this.name = "NotAllowedEmailDomainError";
  }
}
