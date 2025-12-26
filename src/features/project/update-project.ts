"use server";

import { collectionKeys } from "@/constants";
import type { Project } from "@/entities/project";
import { ProjectWithTimestampTransformer } from "@/entities/project.server";
import { getRoleLevel, Role } from "@/entities/role";
import v from "@/entities/valibot";
import { ForbiddenError, UnauthorizedError } from "@/errors/auth";
import { getSelf } from "@/features/user/get-self";
import { adminFirestore } from "@/firebase/admin";

const minimumRole = Role.Leader;
/**
 * 案件情報を更新する
 * Leader 以上の権限が必要
 * ログインしていない、権限が足りない場合はエラーをスローする
 * @param id
 * @param data
 * @returns
 */
export async function updateProjectById(
  id: string,
  data: Partial<Pick<Project, "name" | "status" | "expense">>,
): Promise<Project> {
  const self = await getSelf();
  if (!self) throw new UnauthorizedError();
  if (getRoleLevel(self.role) < getRoleLevel(minimumRole))
    throw new ForbiddenError();

  const docRef = adminFirestore.collection(collectionKeys.projects).doc(id);
  await docRef.update(data);

  return v.parse(ProjectWithTimestampTransformer, {
    id,
    ...(await docRef.get()).data(),
  });
}
