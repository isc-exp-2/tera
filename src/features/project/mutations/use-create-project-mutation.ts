"use client";
import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { queryClient } from "@/query";
import { createProject } from "../create-project";

export function useCreateProjectMutation() {
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
    },
  });
}
