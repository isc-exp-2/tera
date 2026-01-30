"use client";

import { CalendarDate, createCalendar } from "@internationalized/date";
import { CalendarIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useDateField, useDateSegment } from "react-aria";
import { useDateFieldState } from "react-stately";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  value?: Date;
  onChange?: (v: Date) => void;
};

export function NewRequestFormCalendar({ value, onChange }: Props) {
  const [calOpen, setCalOpen] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);

  const state = useDateFieldState({
    value: value
      ? new CalendarDate(
          value.getFullYear(),
          value.getMonth() + 1,
          value.getDate(),
        )
      : null,

    onChange: (d) => {
      if (!d) return;
      onChange?.(new Date(d.year, d.month - 1, d.day));
    },

    locale: "ja-JP",
    createCalendar,
  });

  const { fieldProps } = useDateField(
    { "aria-label": "日付" },
    state,
    fieldRef,
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex items-center">
        <div
          {...fieldProps}
          ref={fieldRef}
          className="flex w-full rounded-md border bg-background px-3 py-2 font-mono text-sm tabular-nums focus-within:ring-2 focus-within:ring-primary"
        >
          {state.segments.map((segment, i) => (
            <DateSegment
              key={`${segment.type}-${i}`}
              segment={segment}
              state={state}
            />
          ))}
        </div>

        <Popover open={calOpen} onOpenChange={setCalOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="absolute right-2 size-6">
              <CalendarIcon className="size-4" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={value}
              captionLayout="dropdown"
              onSelect={(date) => {
                if (!date) return;
                onChange?.(date);
                setCalOpen(false);
              }}
              required={false}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

function DateSegment({ segment, state }: { segment: unknown; state: unknown }) {
  const ref = useRef<HTMLSpanElement>(null);

  const { segmentProps } = useDateSegment(
    segment as Parameters<typeof useDateSegment>[0],
    state as Parameters<typeof useDateSegment>[1],
    ref,
  );

  const text = (segment as { text?: string })?.text ?? "";

  return (
    <span
      {...segmentProps}
      ref={ref}
      className="rounded-sm px-0.5 tabular-nums outline-none transition-colors data-[focused=true]:bg-primary/90 data-[selected=true]:bg-primary data-[focused=true]:text-primary-foreground data-[selected=true]:text-primary-foreground"
    >
      {text}
    </span>
  );
}
