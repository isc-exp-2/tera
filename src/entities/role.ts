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

/**
 * 対象ロールの権限レベルを取得する
 * これを使用してロールを数値に変換し、比較を行うことで権限チェックを簡単に行えるようにする
 * @param role
 * @returns
 */
export function getRoleLevel(role: Role): number {
  return RoleLevels[role];
}
