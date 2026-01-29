"use client";
import { Save } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ProjectExpense,
  ProjectName,
  ProjectStatus,
  ProjectStatusSchema,
} from "@/entities/project";
import { useFormValue } from "@/hooks/useFormValue";
import { toHalfWidth } from "../../../lib/to-half-width";
import { useCreateProjectMutation } from "../mutations/use-create-project-mutation";

export function AddProjectForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName, projectNameError, resetProjectName] =
    useFormValue("", ProjectName);
  const [
    projectExpense,
    setProjectExpense,
    projectExpenseError,
    resetProjectExpense,
  ] = useFormValue<string | number>("", ProjectExpense);
  const [status, setStatus, statusError, resetStatus] = useFormValue(
    ProjectStatus.Exp,
    ProjectStatusSchema,
  );

  function resetForm() {
    resetProjectName();
    resetProjectExpense();
    resetStatus();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((e.nativeEvent as InputEvent).isComposing) return;

    const normalizedValue = toHalfWidth(e.target.value);
    const parsed = Number(normalizedValue);
    setProjectExpense(Number.isNaN(parsed) ? "" : parsed);
  };

  const [isSubmitting, setSubmitting] = useState(false);
  const mutation = useCreateProjectMutation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSubmitting(true);

    await mutation.mutateAsync({
      name: projectName,
      status,
      expense: Number(projectExpense) || 0,
    });
    resetForm();
    setIsOpen(false);
    setSubmitting(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex justify-end">
        <DialogTrigger asChild>
          <Button className="bg-indigo-600 px-6 py-2 text-white">
            ＋ 案件を追加
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="text-xl">案件を追加</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label className="text-gray-700">
                案件名<span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="例: コメット子安小学校"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              {projectNameError && (
                <p className="mt-1 text-red-500 text-sm">{projectNameError}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label className="text-gray-700">
                交通費金額（円）<span className="text-red-500">*</span>
              </Label>
              <Input
                value={projectExpense}
                onChange={handleChange}
                placeholder="例: 200"
              />
              {projectExpenseError && (
                <p className="mt-1 text-red-500 text-sm">
                  {projectExpenseError}
                </p>
              )}
            </div>
            <Label className="text-gray-700">
              案件のステータス<span className="text-red-500">*</span>
            </Label>
            <Select
              value={status}
              onValueChange={(v: ProjectStatus) => setStatus(v)}
            >
              <SelectTrigger className="w-full bg-gray-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ProjectStatus.Exp}>
                  EXP.（EXP.が費用負担）
                </SelectItem>
                <SelectItem value={ProjectStatus.External}>
                  外部（外部が費用負担）
                </SelectItem>
              </SelectContent>
            </Select>
            <Label className="text-gray-500 text-xs">
              ステータスは合計金額の計算に使用されます
            </Label>
          </div>
          <div className="flex w-full gap-4 pt-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="flex-1 py-5"
                onClick={resetForm}
              >
                キャンセル
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="flex-1 bg-indigo-600 py-5 text-white"
              disabled={
                isSubmitting ||
                !projectName ||
                !projectExpense ||
                !!projectNameError ||
                !!projectExpenseError ||
                !!statusError
              }
            >
              <Save />
              追加
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
