"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import type { Department } from "@/entities/department";
import { getDepartmentById } from "../get-department-by-id";

export function useDepartmentByIdQuery(departmentId: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: queryKeys.department(departmentId),
    queryFn: () => getDepartmentById(departmentId),
    initialData: () => {
      // すでに getDepartments で取得した学科一覧がキャッシュに存在する場合、
      // そこから該当の学科情報を返す
      // https://tanstack.com/query/v5/docs/framework/react/guides/initial-query-data#initial-data-from-cache
      return queryClient
        .getQueryData<Department[]>(queryKeys.departments)
        ?.find((dept) => dept.id === departmentId);
    },
    staleTime: Infinity, // 学科一覧は頻繁に変わらないため、無期限にキャッシュする
    gcTime: Infinity, // 学科一覧は大きくないため、無期限にキャッシュする
  });
}
