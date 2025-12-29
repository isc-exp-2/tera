import v from "./valibot";

export enum Role {
  Member = "member",
  Leader = "leader",
  Teacher = "teacher",
  Admin = "admin",
}

export const RoleSchema = v.enum(Role);

const RoleLevels: Record<Role, number> = {
  [Role.Member]: 1,
  [Role.Leader]: 2,
  [Role.Teacher]: 3,
  [Role.Admin]: 4,
};

function getRoleLevel(role: Role): number {
  return RoleLevels[role];
}

/**
 * ユーザーのロールが必要なロール以上かどうかを判定する
 * @param userRole
 * @param requiredRole
 * @returns
 */
export function hasEnoughRole(userRole: Role, requiredRole: Role): boolean {
  return getRoleLevel(userRole) >= getRoleLevel(requiredRole);
}
