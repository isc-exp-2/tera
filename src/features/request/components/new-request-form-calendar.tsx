"use client";

import { IgrDatePicker } from "igniteui-react";

type Props = {
  value: Date;
  onChange: (date: Date) => void;
};

export function NewRequestFormCalendar({ value, onChange }: Props) {
  return (
    <IgrDatePicker
      inputFormat="yyyy/MM/dd"
      className="flex h-auto w-auto items-center rounded-md border-2 bg-background"
      value={value}
      onChange={(e: CustomEvent<Date | null>) => {
        if (!e.detail) return;
        onChange(e.detail);
      }}
    />
  );
}
