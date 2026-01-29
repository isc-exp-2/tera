import { useMemo, useState } from "react";
import v from "@/entities/valibot";
import { useProjectsQuery } from "@/features/project/queries/use-projects-query";
import { useSelf } from "@/features/user/hooks/use-self";
import { useFormValue } from "@/hooks/useFormValue";
import { useCreateRequestMutation } from "../mutations/use-create-request-mutation";
import { useDeleteMyRequestByIdMutation } from "../mutations/use-delete-my-request-by-id-mutation";
import { useMyRequestsQuery } from "../queries/use-my-requests-query";

const projectIdSchema = v.pipe(
  v.string(),
  v.minLength(1, "案件を選択してください"),
);

const dateSchema = v.pipe(
  v.date("日付を入力してください"),
  v.check((d) => !Number.isNaN(d.getTime()), "存在しない日付です"),
);

const memoSchema = v.string();

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
  const [date, setDate, dateError, dateReset] = useFormValue(
    new Date(),
    dateSchema,
  );
  const [memo, setMemo] = useFormValue("", memoSchema);

  const selectedProject = projects.data?.find((p) => p.id === projectId);

  const submit = () => {
    if (!canSubmit) return;
    createRequestMutation.mutate(
      { projectId, date, memo },
      {
        onSuccess: () => {
          onSuccess();
          reset();
        },
      },
    );
  };
  function formatDate(date: Date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    return `${y}年${m}月${d}日`;
  }

  const canSubmit =
    !!projectId &&
    !!selectedProject?.expense &&
    !!date &&
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

export type RequestStatus =
  | "all"
  | "pending"
  | "approved"
  | "rejected"
  | "paid";

export type Request = {
  id: string;
  projectId: string;
  requestedBy: string;
  date: Date;
  memo: string;
  status: Exclude<RequestStatus, "all">;
};

export type RequestWithProject = {
  id: string;
  status: Request["status"];
  date: Date;
  memo: string;

  projectName: string;
  expense: number;

  requestedByName: string;
};

export function useMeRequestTable() {
  const [status, setStatus] = useState<RequestStatus>("all");

  const requestsQuery = useMyRequestsQuery();
  const projectsQuery = useProjectsQuery();
  const self = useSelf();

  const data = useMemo<RequestWithProject[]>(() => {
    if (!requestsQuery.data || !projectsQuery.data || !self) {
      return [];
    }

    const projectMap = new Map(
      projectsQuery.data.map((p) => [
        p.id,
        { name: p.name, expense: p.expense },
      ]),
    );

    const requesterName = `${self.lastName} ${self.firstName}`;

    const joined = requestsQuery.data
      .map((req): RequestWithProject | null => {
        const project = projectMap.get(req.projectId);
        if (!project) return null;

        return {
          id: req.id,
          status: req.status,
          date: req.date,
          memo: req.memo,
          projectName: project.name,
          expense: project.expense,
          requestedByName: requesterName,
        };
      })
      .filter((row): row is RequestWithProject => row !== null);

    if (status === "all") {
      return joined;
    }

    return joined.filter((row) => row.status === status);
  }, [requestsQuery.data, projectsQuery.data, self, status]);

  const deleteMutation = useDeleteMyRequestByIdMutation();

  const deleteRequest = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    await requestsQuery.refetch();
  };

  return {
    status,
    setStatus,
    data,
    isLoading: requestsQuery.isLoading || projectsQuery.isLoading,
    error: requestsQuery.error || projectsQuery.error,
    deleteRequest,
    isDeleting: deleteMutation.isPending,
  };
}
