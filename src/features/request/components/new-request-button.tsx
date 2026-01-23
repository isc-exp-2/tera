"use client";

import { NewRequestConfirmForm } from "./new-reqest-cnofirm-dialog";
import { NewRequestDialog } from "./new-request-dialog";
import { useNewRequestForm } from "./use-new-request-form";
export function NewRequestButton() {
  const form = useNewRequestForm(() => {});
  return (
    <>
      <button
        type="button"
        onClick={() => form.setOpen(true)}
        className="flex items-center rounded-xl bg-indigo-500 px-8 py-2 text-white"
      >
        ＋新規申請
      </button>
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
