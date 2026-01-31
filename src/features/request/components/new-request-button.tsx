"use client";

import { Button } from "@/components/ui/button";
import { useNewRequestForm } from "../hooks/use-new-request-form";
import { NewRequestConfirmForm } from "./new-request-confirm-dialog";
import { NewRequestDialog } from "./new-request-dialog";
export function NewRequestButton() {
  const form = useNewRequestForm(() => {});
  return (
    <>
      <Button
        type="button"
        onClick={() => form.setOpen(true)}
        className="flex items-center rounded-xl bg-indigo-500 px-8 py-2 text-white"
      >
        ＋新規申請
      </Button>
      <NewRequestDialog
        open={form.open}
        onOpenChange={form.setOpen}
        onSuccess={() => {
          form.setOpen(false);
          form.setCheck(true);
        }}
        form={form}
      />
      <NewRequestConfirmForm
        open={form.check}
        onOpenChange={form.setCheck}
        onSuccess={() => form.setCheck(false)}
        form={form}
      />
    </>
  );
}
