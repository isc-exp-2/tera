// このファイルでは Tanstack Query の クエリキーを定義

export const departments = ["departments"] as const;

export const department = (departmentId: string) =>
  ["department", departmentId] as const;

export const projects = ["projects"] as const;
export const project = (projectId: string) => ["project", projectId] as const;

export const myRequests = ["myRequests"] as const;
