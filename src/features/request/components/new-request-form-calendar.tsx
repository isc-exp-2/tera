"use client";

import { CalendarIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
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
  const inputRef = useRef<HTMLInputElement>(null);

  const seg = InValDateSegments(inputRef, value);

  const val = DateValueEditor(seg, onChange);

  const [calOpen, setCalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Input
          ref={inputRef}
          value={seg.getValue()}
          inputMode="numeric"
          className="pr-10 font-mono"
          onFocus={() => seg.forceHighlight("year")}
          onChange={() => {}}
          onClick={(e) => {
            const pos = (e.target as HTMLInputElement).selectionStart ?? 0;
            seg.clickSegmentPoint(pos);
          }}
          onKeyDown={(e) => {
            if (/^[0-9]$/.test(e.key)) {
              e.preventDefault();
              val.inputDate(e.key);
              return;
            }

            if (e.key === "Backspace" || e.key === "Delete") {
              e.preventDefault();
              val.backspaceOrDelete();
              return;
            }

            if (e.key === "ArrowLeft") {
              e.preventDefault();
              seg.moveSegmentPoint("prev");
              return;
            }
            if (e.key === "ArrowRight") {
              e.preventDefault();
              seg.moveSegmentPoint("next");
              return;
            }
          }}
        />

        <Popover open={calOpen} onOpenChange={setCalOpen}>
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
              selected={value}
              captionLayout="dropdown"
              onSelect={(date) => {
                if (!date) return;

                onChange?.(date);
                seg.getCalDate(date);
                seg.forceHighlight("day");

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

// function InValDateSegments(inputRef: React.RefObject<HTMLInputElement | null>) {
function InValDateSegments(
  inputRef: React.RefObject<HTMLInputElement | null>,
  value?: Date,
) {
  useEffect(() => {
    if (value) {
      setSegmentData({
        year: String(value.getFullYear()).padStart(4, "0"),
        month: String(value.getMonth() + 1).padStart(2, "0"),
        day: String(value.getDate()).padStart(2, "0"),
      });
    }
  }, [value]);
  type Segment = "year" | "month" | "day";

  const segmentOrder: Segment[] = ["year", "month", "day"];

  const segmentConfig: Record<Segment, { from: number; length: number }> = {
    year: { from: 0, length: 4 },
    month: { from: 5, length: 2 },
    day: { from: 8, length: 2 },
  };

  const [segmentData, setSegmentData] = useState({
    year: "0000",
    month: "00",
    day: "00",
  });

  const [segmentPoint, setSegmentPoint] = useState<Segment>("year");

  const getValue = () =>
    `${segmentData.year}/${segmentData.month}/${segmentData.day}`;

  const getCalDate = (date: Date) => {
    setSegmentData({
      year: String(date.getFullYear()).padStart(4, "0"),
      month: String(date.getMonth() + 1).padStart(2, "0"),
      day: String(date.getDate()).padStart(2, "0"),
    });
  };

  const highlight = (seg: Segment) => {
    const el = inputRef.current;
    if (!el) return;

    const { from, length } = segmentConfig[seg];
    el.setSelectionRange(from, from + length);
  };

  const forceHighlight = (seg: Segment) => {
    requestAnimationFrame(() => highlight(seg));
  };

  const nextSegments = Object.fromEntries(
    segmentOrder.map((seg, i) => [seg, segmentOrder[i + 1] ?? null]),
  ) as Record<Segment, Segment | null>;

  const backSegments = Object.fromEntries(
    segmentOrder.map((seg, i) => [seg, segmentOrder[i - 1] ?? null]),
  ) as Record<Segment, Segment | null>;

  function moveSegmentPoint(dir: "prev" | "next") {
    const next =
      dir === "next" ? nextSegments[segmentPoint] : backSegments[segmentPoint];

    if (!next) return;

    setSegmentPoint(next);
    forceHighlight(next);
  }

  function clickSegmentPoint(pos: number) {
    const seg = segmentOrder.find((s) => {
      const { from, length } = segmentConfig[s];
      return pos >= from && pos < from + length;
    });

    if (!seg) return;

    setSegmentPoint(seg);
    forceHighlight(seg);
  }

  return {
    segmentOrder,
    segmentConfig,
    segmentData,
    segmentPoint,
    getValue,
    getCalDate,
    highlight,
    forceHighlight,
    moveSegmentPoint,
    clickSegmentPoint,
    setSegmentData,
    setSegmentPoint,
  };
}

function DateValueEditor(
  seg: ReturnType<typeof InValDateSegments>,
  onChange?: (d: Date) => void,
) {
  const [offset, setOffset] = useState(0);
  const [completed, setCompleted] = useState({
    year: false,
    month: false,
    day: false,
  });

  const segmentLength = { year: 4, month: 2, day: 2 };

  const isValidDate = (y: number, m: number, d: number) => {
    const dt = new Date(y, m - 1, d);
    return (
      dt.getFullYear() === y && dt.getMonth() + 1 === m && dt.getDate() === d
    );
  };

  const applySegments = (nextSegments: typeof seg.segmentData) => {
    seg.setSegmentData(nextSegments);

    const y = Number(nextSegments.year);
    const m = Number(nextSegments.month);
    const d = Number(nextSegments.day);

    if (isValidDate(y, m, d)) {
      onChange?.(new Date(y, m - 1, d));
    }
  };

  const resetSegment = (seglength: number) => "0".repeat(seglength);

  function inputDate(digit: string) {
    const segKey = seg.segmentPoint;
    const len = segmentLength[segKey];

    let value = seg.segmentData[segKey];

    if (completed[segKey]) {
      value = "0".repeat(len);
      setCompleted((c) => ({ ...c, [segKey]: false }));
      setOffset(0);
    }

    const nextValue = value.slice(1) + digit;
    const nextOffset = offset + 1;

    applySegments({
      ...seg.segmentData,
      [segKey]: nextValue,
    });

    if (nextOffset >= len) {
      setCompleted((c) => ({ ...c, [segKey]: true }));
      setOffset(0);
      seg.moveSegmentPoint("next");
    } else {
      setOffset(nextOffset);
      seg.forceHighlight(segKey);
    }
  }

  function backspaceOrDelete() {
    const zero = resetSegment(seg.segmentConfig[seg.segmentPoint].length);
    const nextSegments = { ...seg.segmentData, [seg.segmentPoint]: zero };

    applySegments(nextSegments);
    setOffset(0);
    seg.forceHighlight(seg.segmentPoint);
  }

  return { inputDate, backspaceOrDelete };
}
