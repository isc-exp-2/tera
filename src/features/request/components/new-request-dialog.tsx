"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { useNewRequestForm } from "../hooks/use-new-request-form";
import { NewRequestForm } from "./new-request-form";
export function NewRequestDialog({
  open,
  onOpenChange,
  onSuccess,
  form,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  form: ReturnType<typeof useNewRequestForm>;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>交通費申請</DialogTitle>
          <DialogDescription className="sr-only">
            警告回避用です
          </DialogDescription>
        </DialogHeader>

        <NewRequestForm
          onSuccess={() => {
            onOpenChange(false);
            onSuccess();
          }}
          form={form}
        />

        <DialogClose asChild>
          <Button
            variant="outline"
            type="button"
            className="w-full py-5"
            onClick={form.reset}
          >
            キャンセル
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
