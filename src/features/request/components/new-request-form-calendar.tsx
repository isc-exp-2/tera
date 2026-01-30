"use client";

import { IgrDatePicker } from "igniteui-react";

type Props = {
  value: Date;
  onChange: (date: Date) => void;
};

export function NewRequestFormCalendar({ value, onChange }: Props) {
  return (
    <IgrDatePicker
      className="flex w-auto items-center rounded-md border bg-background focus-within:ring-2 focus-within:ring-ring"
      value={value}
      onChange={(e: CustomEvent<Date | null>) => {
        if (!e.detail) return;
        onChange(e.detail);
      }}
    />
  );
}
