"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getUserById } from "../get-user-by-id";

export function useUserByIdQuery(userId: string) {
  return useQuery({
    queryKey: queryKeys.user(userId),
    queryFn: () => getUserById(userId),
  });
}
