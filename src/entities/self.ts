import v from "@/entities/valibot";
import { RoleSchema } from "./role";

export const AuthSelf = v.object({
  uid: v.string(),
  // Firebase Authentication Admin SDK の型定義は optional になっていないが、処理上必要なため Required にする
  email: v.pipe(v.string(), v.email()),
  picture: v.optional(v.string()),
});

export type AuthSelf = v.InferOutput<typeof AuthSelf>;

export const LastName = v.pipe(
  v.string(),
  v.minLength(1, "姓を入力してください。"),
);

export type LastName = v.InferOutput<typeof LastName>;

export const FirstName = v.pipe(
  v.string(),
  v.minLength(1, "名を入力してください。"),
);

export type FirstName = v.InferOutput<typeof FirstName>;

export const UserInfo = v.object({
  /**
   * 名前（姓）
   */
  lastName: LastName,

  /**
   * 名前（名）
   */
  firstName: FirstName,

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
