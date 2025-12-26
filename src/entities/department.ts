import v from "@/entities/valibot";

export const Department = v.object({
  id: v.string(),
  name: v.string(),
});

export type Department = v.InferOutput<typeof Department>;
