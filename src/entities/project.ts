import v from "@/entities/valibot";

export enum ProjectStatus {
  Exp = "exp",
  External = "external",
}

export const ProjectName = v.pipe(
  v.string(),
  v.minLength(1, "案件名を入力してください。"),
);

export type ProjectName = v.InferOutput<typeof ProjectName>;

export const ProjectExpense = v.pipe(
  v.number(),
  v.minValue(0, "交通費は0以上で入力してください。"),
);

export type ProjectExpense = v.InferOutput<typeof ProjectExpense>;

export const ProjectStatusSchema = v.enum(ProjectStatus);

export type ProjectStatusSchema = v.InferOutput<typeof ProjectStatusSchema>;

export const Project = v.object({
  id: v.string(),
  name: v.pipe(v.string(), v.nonEmpty()),
  status: v.enum(ProjectStatus),
  expense: v.number(),
  createdBy: v.string(),
  createdAt: v.date(),
});

export type Project = v.InferOutput<typeof Project>;
