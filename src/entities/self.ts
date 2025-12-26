import v from "@/entities/valibot";
import { RoleSchema } from "./role";

export const AuthSelf = v.object({
  uid: v.string(),
  // Firebase Authentication Admin SDK の型定義は optional になっていないが、処理上必要なため Required にする
  email: v.pipe(v.string(), v.email()),
  picture: v.optional(v.string()),
});

export type AuthSelf = v.InferOutput<typeof AuthSelf>;

export const UserInfo = v.object({
  /**
   * 名前（姓）
   */
  lastName: v.string(),

  /**
   * 名前（名）
   */
  firstName: v.string(),

  /**
   * 入学年度
   */
  enrollmentYear: v.number(),

  departmentId: v.string(),

  role: RoleSchema,
});

export type UserInfo = v.InferOutput<typeof UserInfo>;

export const Self = v.object({
  ...AuthSelf.entries,
  ...UserInfo.entries,
});

export type Self = v.InferOutput<typeof Self>;
