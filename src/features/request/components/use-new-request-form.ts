import { useState } from "react";
import v from "@/entities/valibot";
import { useProjectsQuery } from "@/features/project/queries/use-projects-query";
import { useFormValue } from "@/hooks/useFormValue";
import { useCreateRequestMutation } from "../mutations/use-create-request-mutation";

const projectIdSchema = v.pipe(
  v.string(),
  v.minLength(1, "案件を選択してください"),
);

const dateSchema = v.pipe(v.string(), v.minLength(8, "日付を入力してください"));

const memoSchema = v.string();

function digitsToDate(digits: string): Date | null {
  if (!/^\d{8}$/.test(digits)) return null;

  const y = Number(digits.slice(0, 4));
  const m = Number(digits.slice(4, 6));
  const d = Number(digits.slice(6, 8));

  const date = new Date(y, m - 1, d);

  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return null;
  }

  return date;
}

export function useNewRequestForm(onSuccess: () => void) {
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const projects = useProjectsQuery();
  const createRequestMutation = useCreateRequestMutation();
  const reset = () => {
    projectReset();
    dateReset();
    setMemo("");
    setCheck(false);
    setOpen(false);
  };

  const [projectId, setProjectId, projectError, projectReset] = useFormValue(
    "",
    projectIdSchema,
  );
  const [date, setDate, dateError, dateReset] = useFormValue("", dateSchema);
  const [memo, setMemo] = useFormValue("", memoSchema);

  const selectedProject = projects.data?.find((p) => p.id === projectId);

  const submit = () => {
    if (!canSubmit) return;
    createRequestMutation.mutate(
      { projectId, date: parsedDate, memo },
      {
        onSuccess: () => {
          onSuccess();
          reset();
        },
      },
    );
  };
  function formatDate(date: string) {
    const y = date.slice(0, 4);
    const m = date.slice(4, 6);
    const d = date.slice(6, 8);
    return `${y}年${m}月${d}日`;
  }
  const parsedDate = digitsToDate(date);

  const canSubmit =
    !!projectId &&
    !!selectedProject?.expense &&
    !!parsedDate &&
    !projectError &&
    !dateError;

  return {
    open,
    setOpen,
    check,
    setCheck,
    projects,
    projectId,
    setProjectId,
    date,
    setDate,
    memo,
    setMemo,
    formatDate,
    name: selectedProject?.name,
    expense: selectedProject?.expense,
    submit,
    errors: { projectError, dateError },
    reset,
    canSubmit,
    isPending: createRequestMutation.isPending,
  };
}
