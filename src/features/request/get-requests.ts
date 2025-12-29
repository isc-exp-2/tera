"use server";

import { collectionKeys } from "@/constants";
import type { Request } from "@/entities/request";
import { RequestWithTimestampTransformer } from "@/entities/request.server";
import { hasEnoughRole, Role } from "@/entities/role";
import v from "@/entities/valibot";
import { ForbiddenError, UnauthorizedError } from "@/errors/auth";
import { adminFirestore } from "@/firebase/admin";
import { getSelf } from "../user/get-self";

const minimumRole = Role.Leader;
/**
 * すべての交通費申請を取得する
 * Leader 以上の権限が必要
 * TODO: この関数は申請が多くなったときにパフォーマンスが悪くなる可能性があるため、時期を見てページネーションを実装する
 */
export async function getRequests(): Promise<Request[]> {
  const self = await getSelf();

  if (!self) throw new UnauthorizedError();
  if (!hasEnoughRole(self.role, minimumRole)) throw new ForbiddenError();

  const snapshot = await adminFirestore
    .collection(collectionKeys.requests)
    .get();

  return snapshot.docs.map((doc) =>
    v.parse(RequestWithTimestampTransformer, {
      id: doc.id,
      ...doc.data(),
    }),
  );
}
