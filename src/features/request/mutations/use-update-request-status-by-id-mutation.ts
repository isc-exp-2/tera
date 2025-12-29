"use client";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/query";
import { queryKeys } from "@/constants";
import type { RequestStatus } from "@/entities/request";
import { updateRequestStatusById } from "../update-request-status-by-id";

export function useUpdateRequestStatusByIdMutation() {
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: RequestStatus }) =>
      updateRequestStatusById(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.myRequests,
      });
    },
  });
}
