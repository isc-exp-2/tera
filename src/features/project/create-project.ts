"use server";

import { firestore } from "firebase-admin";
import { collectionKeys } from "@/constants";
import type { Project } from "@/entities/project";
import {
  ProjectWithTimestamp,
  ProjectWithTimestampTransformer,
} from "@/entities/project.server";
import { hasEnoughRole, Role } from "@/entities/role";
import v from "@/entities/valibot";
import { ForbiddenError, UnauthorizedError } from "@/errors/auth";
import { adminFirestore } from "@/firebase/admin";
import { getSelf } from "../user/get-self";

const minimumRole = Role.Leader;
/**
 * 案件を作成する
 * Leader 以上の権限が必要
 * @param unsafeProject
 * @returns
 */
export async function createProject(
  unsafeProject: Omit<Project, "id" | "createdAt" | "createdBy">,
): Promise<Project> {
  const self = await getSelf();

  if (!self) throw new UnauthorizedError();
  if (!hasEnoughRole(self.role, minimumRole)) throw new ForbiddenError();

  const safeProject = v.parse(v.omit(ProjectWithTimestamp, ["id"]), {
    ...unsafeProject,
    createdAt: firestore.Timestamp.now(),
    createdBy: self.uid,
  });

  const createdDocRef = await adminFirestore
    .collection(collectionKeys.projects)
    .add(safeProject);

  return v.parse(ProjectWithTimestampTransformer, {
    ...safeProject,
    id: createdDocRef.id,
  });
}
