"use server";

import { collectionKeys } from "@/constants";
import type { Project } from "@/entities/project";
import { ProjectWithTimestampTransformer } from "@/entities/project.server";
import v from "@/entities/valibot";
import { adminFirestore } from "@/firebase/admin";

export async function updateProjectById(
  id: string,
  data: Partial<Pick<Project, "name" | "status" | "expense">>,
): Promise<Project> {
  const docRef = adminFirestore.collection(collectionKeys.projects).doc(id);
  await docRef.update(data);

  return v.parse(ProjectWithTimestampTransformer, {
    id,
    ...(await docRef.get()).data(),
  });
}
