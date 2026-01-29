"use client";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { RequestStatus } from "../hooks/use-new-request-form";

const BADGES: { label: string; value: RequestStatus }[] = [
  { label: "すべて", value: "all" },
  { label: "承認待ち", value: "pending" },
  { label: "承認済み", value: "approved" },
  { label: "精算済み", value: "paid" },
  { label: "拒否", value: "rejected" },
];

type Props = {
  value: RequestStatus;
  onChange: (value: RequestStatus) => void;
};

export function MeRequestsBadge({ value, onChange }: Props) {
  return (
    <>
      {/* PC: バッジ */}
      <div className="hidden flex-wrap gap-3 sm:flex">
        {BADGES.map(({ label, value: v }) => {
          const isActive = value === v;

          return (
            <Badge
              key={v}
              onClick={() => onChange(v)}
              className={cn(
                "cursor-pointer rounded-xl px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100",
              )}
            >
              {label}
            </Badge>
          );
        })}
      </div>

      {/* スマホ: Select */}
      <div className="w-auto sm:hidden">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="ステータスを選択" />
          </SelectTrigger>

          <SelectContent>
            {BADGES.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
