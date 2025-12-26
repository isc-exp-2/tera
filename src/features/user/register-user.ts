"use server";
import { collectionKeys } from "@/constants";
import { type Self, UserInfo } from "@/entities/self";
import v from "@/entities/valibot";
import { adminFirestore } from "@/firebase/admin";
import { getAuthSelf } from "./get-self";
import { getSelfIsCompletedOnboarding } from "./get-self-is-completed-onboarding";

/**
 * 新規ユーザー登録を行う
 * すでにオンボーディングが完了している場合、ログインしていない場合は null を返す
 */
export async function registerSelf(
  unsafeUserInfo: UserInfo,
): Promise<Self | null> {
  const userInfo = v.parse(UserInfo, unsafeUserInfo);

  const authSelf = await getAuthSelf();
  if (!authSelf) return null;

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
