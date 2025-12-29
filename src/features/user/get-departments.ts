"use server";

import { collectionKeys } from "@/constants";
import { Department } from "@/entities/department";
import v from "@/entities/valibot";
import { UnauthorizedError } from "@/errors/auth";
import { adminFirestore } from "@/firebase/admin";
import { getAuthSelf } from "./get-self";

/**
 * 存在するすべての学科情報を取得
 * @returns
 */
export async function getDepartments(): Promise<Department[]> {
  const authSelf = await getAuthSelf();
  if (!authSelf) throw new UnauthorizedError();

  const docsRef = await adminFirestore
    .collection(collectionKeys.departments)
    .get();

  return docsRef.docs.map((doc) =>
    v.parse(Department, { id: doc.id, ...doc.data() }),
  );
}
