"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { getDepartments } from "../get-departments";

/**
 * 学科一覧を取得するための Query Hook
 */
export function useDepartmentsQuery() {
  return useQuery({
    queryKey: queryKeys.departments,
    queryFn: getDepartments,
    staleTime: Infinity, // 学科一覧は頻繁に変わらないため、無期限にキャッシュする
    gcTime: Infinity, // 学科一覧は大きくないため、無期限にキャッシュする
  });
}
