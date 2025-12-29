"use client";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/query";
import { queryKeys } from "@/constants";
import { createProject } from "../create-project";

export function useCreateProjectMutation() {
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
    },
  });
}
