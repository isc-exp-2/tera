"use client";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/query";
import { queryKeys } from "@/constants";
import { deleteMyRequestById } from "../delete-my-request-by-id";

export function useDeleteMyRequestByIdMutation() {
  return useMutation({
    mutationFn: deleteMyRequestById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.myRequests,
      });
    },
  });
}
