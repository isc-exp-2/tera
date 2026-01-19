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
import { createProject } from "@/features/project/create-project";
import { useFormValue } from "@/hooks/useFormValue";

export default function CaseManagementPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName, projectNameError] = useFormValue(
    "",
    ProjectName,
  );
  const [projectExpense, setProjectExpense, projectExpenseError] = useFormValue(
    0,
    ProjectExpense,
  );
  const [status, setStatus, statusError] = useFormValue(
    ProjectStatus.Exp,
    ProjectStatusSchema,
  );

  const toHalfWidth = (s: string) => {
    return s.replace(/[０-９]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((e.nativeEvent as any).isComposing) return;

    const normalizedValue = toHalfWidth(e.target.value);
    setProjectExpense(Number(normalizedValue) || 0);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await createProject({
      name: projectName,
      status,
      expense: projectExpense,
    });
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex justify-end">
        <DialogTrigger asChild>
          <Button
            className="bg-indigo-600 px-6 py-2 text-white"
            onClick={() => {
              setProjectName("");
              setProjectExpense(0);
              setStatus(ProjectStatus.Exp);
            }}
          >
            ＋ 案件を追加
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[425px]">
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
            </div>
            <div className="grid gap-3">
              <Label className="text-gray-700">
                交通費金額（円）<span className="text-red-500">*</span>
              </Label>
              <Input
                value={projectExpense === 0 ? "" : String(projectExpense)}
                onChange={handleChange}
                placeholder="例: 200"
              />
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
                <SelectItem value="external">外部（外部が費用負担）</SelectItem>
              </SelectContent>
            </Select>
            <Label className="text-gray-500 text-xs">
              ステータスは合計金額の計算に使用されます
            </Label>
          </div>
          <div className="flex w-full gap-4 pt-4">
            <DialogClose asChild>
              <Button variant="outline" className="flex-1 py-5">
                キャンセル
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="flex-1 bg-indigo-600 py-5 text-white"
              disabled={!projectName || !projectExpense || !status}
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
