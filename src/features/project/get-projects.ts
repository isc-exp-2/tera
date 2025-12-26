"use server";
import { cache } from "react";

import { collectionKeys } from "@/constants";
import type { Project } from "@/entities/project";
import { ProjectWithTimestampTransformer } from "@/entities/project.server";
import v from "@/entities/valibot";
import { adminFirestore } from "@/firebase/admin";

export const getProjects = cache(async (): Promise<Project[]> => {
  const snapshot = await adminFirestore
    .collection(collectionKeys.projects)
    .get();

  return snapshot.docs.map((doc) =>
    v.parse(ProjectWithTimestampTransformer, {
      id: doc.id,
      ...doc.data(),
    }),
  );
});
