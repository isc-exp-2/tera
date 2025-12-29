"use client";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/query";
import { queryKeys } from "@/constants";
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
