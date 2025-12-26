import v from "@/entities/valibot";

export enum ProjectStatus {
  Exp = "exp",
  External = "external",
}

export const Project = v.object({
  id: v.string(),
  name: v.pipe(v.string(), v.nonEmpty()),
  status: v.enum(ProjectStatus),
  expense: v.number(),
  createdBy: v.string(),
  createdAt: v.date(),
});

export type Project = v.InferOutput<typeof Project>;
