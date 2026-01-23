"use client";

import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Segment = "year" | "month" | "day";

const SEGMENTS = {
  year: { start: 0, length: 4 },
  month: { start: 4, length: 2 },
  day: { start: 6, length: 2 },
} as const;

type Props = {
  value?: string;
  onChange?: (v: string) => void;
};

export function NewRequestFormCalender({ value, onChange }: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [digits, setDigits] = React.useState("00000000");
  const [segment, setSegment] = React.useState<Segment>("year");
  const [offset, setOffset] = React.useState(0);

  const [completed, setCompleted] = React.useState<{
    year: boolean;
    month: boolean;
    day: boolean;
  }>({
    year: false,
    month: false,
    day: false,
  });

  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [month, setMonth] = React.useState(new Date());

  React.useEffect(() => {
    if (value && /^\d{8}$/.test(value)) {
      setDigits(value);
      setCompleted({ year: true, month: true, day: true });
    }
  }, [value]);

  function getDisplayValue(d: string) {
    const y = d.slice(0, 4);
    const m = d.slice(4, 6);
    const da = d.slice(6, 8);

    const year = y === "0000" ? " 年  " : y;
    const month = m === "00" ? "月 " : m;
    const day = da === "00" ? "日 " : da;

    return `${year}/${month}/${day}`;
  }

  function replaceRange(
    base: string,
    start: number,
    length: number,
    value: string,
  ) {
    return base.slice(0, start) + value + base.slice(start + length);
  }

  function shiftLeftFill(value: string, digit: string) {
    return value.slice(1) + digit;
  }

  function highlightSegment(seg: Segment) {
    const el = inputRef.current;
    if (!el) return;

    let from = 0;
    let length = 0;

    if (seg === "year") {
      from = 0;
      length = 4;
    } else if (seg === "month") {
      from = 5;
      length = 2;
    } else {
      from = 8;
      length = 2;
    }

    el.setSelectionRange(from, from + length);
  }

  function forceHighlight(seg = segment) {
    requestAnimationFrame(() => highlightSegment(seg));
  }

  function syncCalendar(next: string) {
    const y = Number(next.slice(0, 4));
    const m = Number(next.slice(4, 6));
    const d = Number(next.slice(6, 8));

    if (!y || !m || !d) return;

    const date = new Date(y, m - 1, d);
    if (
      date.getFullYear() === y &&
      date.getMonth() === m - 1 &&
      date.getDate() === d
    ) {
      setSelectedDate(date);
      setMonth(date);
    }
  }

  function moveSegment(dir: "prev" | "next") {
    let next = segment;
    if (dir === "prev") {
      if (segment === "day") next = "month";
      else if (segment === "month") next = "year";
    } else {
      if (segment === "year") next = "month";
      else if (segment === "month") next = "day";
    }
    setSegment(next);
    setOffset(0);
    forceHighlight(next);
  }

  function getSegmentFromPos(pos: number): Segment {
    if (pos <= 3) return "year";
    if (pos === 4) return "year";
    if (pos <= 6) return "month";
    if (pos === 7) return "month";
    return "day";
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Input
          ref={inputRef}
          value={getDisplayValue(digits)}
          inputMode="numeric"
          className="pr-10 font-mono"
          onChange={() => {}}
          onClick={() => {
            const el = inputRef.current;
            if (!el) return;

            const pos = el.selectionStart ?? 0;
            const seg = getSegmentFromPos(pos);

            setSegment(seg);
            setOffset(0);
            forceHighlight(seg);
          }}
          onFocus={() => {
            forceHighlight(segment);
          }}
          onKeyDown={(e) => {
            const { start, length } = SEGMENTS[segment];

            if (e.key === "Tab") {
              e.preventDefault();
              moveSegment(e.shiftKey ? "prev" : "next");
              return;
            }

            if (e.key === "ArrowLeft") {
              e.preventDefault();
              moveSegment("prev");
              return;
            }
            if (e.key === "ArrowRight") {
              e.preventDefault();
              moveSegment("next");
              return;
            }

            if (/^\d$/.test(e.key)) {
              e.preventDefault();

              const current = digits.slice(start, start + length);

              // ★ 入力完了済みなら一度リセット
              if (completed[segment] && offset === 0) {
                const zero = "0".repeat(length);
                const resetValue = zero.slice(0, length - 1) + e.key;

                const nextDigits = replaceRange(
                  digits,
                  start,
                  length,
                  resetValue,
                );

                setDigits(nextDigits);
                onChange?.(nextDigits);
                syncCalendar(nextDigits);

                setCompleted((c) => ({ ...c, [segment]: false }));

                // ★ month で 1 以外なら即 day へ
                if (segment === "month" && e.key !== "1") {
                  setOffset(0);
                  setSegment("day");
                  forceHighlight("day");
                } else {
                  setOffset(1);
                  forceHighlight(segment);
                }
                return;
              }

              let nextValue = current;
              let nextOffset = offset;
              let nextSegment = segment;

              if (segment === "year") {
                nextValue = shiftLeftFill(current, e.key);
                nextOffset++;

                if (nextOffset >= 4) {
                  nextOffset = 0;
                  nextSegment = "month";
                  setCompleted((c) => ({ ...c, year: true }));
                }
              } else if (segment === "month") {
                if (offset === 0) {
                  if (e.key !== "1") {
                    // 01〜09 → 即確定
                    nextValue = `0${e.key}`;
                    nextOffset = 0;
                    nextSegment = "day";
                    setCompleted((c) => ({ ...c, month: true }));
                  } else {
                    // 10 / 11 / 12 の可能性
                    nextValue = "01";
                    nextOffset = 1;
                  }
                } else {
                  // 2桁目
                  nextValue = shiftLeftFill(current, e.key);
                  nextOffset = 0;
                  nextSegment = "day";
                  setCompleted((c) => ({ ...c, month: true }));
                }
              } else {
                nextValue = shiftLeftFill(current, e.key);
                nextOffset = 0;
                setCompleted((c) => ({ ...c, day: true }));
              }

              const nextDigits = replaceRange(digits, start, length, nextValue);

              setDigits(nextDigits);
              onChange?.(nextDigits);
              syncCalendar(nextDigits);
              setOffset(nextOffset);
              setSegment(nextSegment);
              forceHighlight(nextSegment);
              return;
            }

            if (e.key === "Backspace" || e.key === "Delete") {
              e.preventDefault();

              const zero = "0".repeat(length);
              const nextDigits = replaceRange(digits, start, length, zero);

              setDigits(nextDigits);
              onChange?.(nextDigits);
              syncCalendar(nextDigits);

              setCompleted((c) => ({ ...c, [segment]: false }));
              setOffset(0);
              forceHighlight(segment);
              return;
            }

            e.preventDefault();
          }}
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="-translate-y-1/2 absolute top-1/2 right-2 size-6"
            >
              <CalendarIcon className="size-4" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={selectedDate ?? undefined}
              month={month}
              onMonthChange={setMonth}
              captionLayout="dropdown"
              onSelect={(date) => {
                if (!date) return;

                const y = date.getFullYear().toString().padStart(4, "0");
                const m = (date.getMonth() + 1).toString().padStart(2, "0");
                const d = date.getDate().toString().padStart(2, "0");

                const next = `${y}${m}${d}`;

                setDigits(next);
                onChange?.(next);
                setSelectedDate(date);
                setMonth(new Date(date.getFullYear(), date.getMonth(), 1));

                setCompleted({
                  year: true,
                  month: true,
                  day: true,
                });

                setSegment("day");
                setOffset(0);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
