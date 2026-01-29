"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { RequestWithProject } from "../hooks/use-new-request-form";
import { MeRequestsStatusDesign } from "./me-requests-status-design";

type Props = {
  data: RequestWithProject[];
  loading?: boolean;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
};

export function MeRequestsTable({
  data,
  loading,
  onDelete,
  isDeleting,
}: Props) {
  if (loading) {
    return <div className="mt-6">Loading...</div>;
  }

  const formatDateJP = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}年${m}月${d}日`;
  };

  return (
    <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-left font-medium text-lg">
              ステータス
            </TableHead>
            <TableHead className="text-left font-medium text-lg">
              案件内容
            </TableHead>
            <TableHead className="text-left font-medium text-lg">
              参加日時
            </TableHead>
            <TableHead className="text-right font-medium text-lg">
              金額
            </TableHead>
            <TableHead className="text-left font-medium text-lg">
              備考
            </TableHead>
            <TableHead className="text-left font-medium text-lg">
              削除
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-6 text-center text-gray-400 text-sm"
              >
                申請がありません
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="py-5">
                  <MeRequestsStatusDesign status={row.status} />
                </TableCell>

                <TableCell className="py-5 font-medium">
                  {row.projectName}
                </TableCell>

                <TableCell className="whitespace-nowrap py-5">
                  {formatDateJP(row.date)}
                </TableCell>

                <TableCell className="py-5 text-right">
                  ¥{row.expense.toLocaleString()}
                </TableCell>

                <TableCell className="py-5 text-gray-600">{row.memo}</TableCell>

                <TableCell className="py-5">
                  {row.status === "pending" && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onDelete(row.id)}
                      disabled={isDeleting}
                      className="text-red-600 hover:text-red-700 disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
