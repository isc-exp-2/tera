"use client";
import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { queryClient } from "@/query";
import { createRequest } from "../create-request";

export function useCreateRequestMutation() {
  return useMutation({
    mutationFn: createRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.myRequests,
      });
    },
  });
}
