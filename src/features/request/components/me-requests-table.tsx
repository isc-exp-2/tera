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
import { RequestStatus } from "@/entities/request";
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
    <div className="mt-6">
      <Table className="mb-6 overflow-hidden rounded-lg shadow">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="px-2 py-2 text-left font-medium text-lg">
              ステータス
            </TableHead>
            <TableHead className="px-2 py-2 text-left font-medium text-lg">
              案件内容
            </TableHead>
            <TableHead className="px-2 py-2 text-left font-medium text-lg">
              参加日時
            </TableHead>
            <TableHead className="px-2 py-2 text-right font-medium text-lg">
              金額
            </TableHead>
            <TableHead className="px-2 py-2 text-left font-medium text-lg">
              備考
            </TableHead>
            <TableHead className="px-2 py-2 text-left font-medium text-lg">
              削除
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white">
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
            data.map((row) => {
              const canDelete = row.status === RequestStatus.Pending;

              return (
                <TableRow key={row.id}>
                  <TableCell className="py-4">
                    <MeRequestsStatusDesign status={row.status} />
                  </TableCell>

                  <TableCell className="py-4 font-medium">
                    {row.projectName}
                  </TableCell>

                  <TableCell className="whitespace-nowrap py-4">
                    {formatDateJP(row.date)}
                  </TableCell>

                  <TableCell className="py-4 text-right">
                    ¥{row.expense.toLocaleString()}
                  </TableCell>

                  <TableCell className="py-4 text-gray-600">
                    {row.memo}
                  </TableCell>

                  <TableCell className="py-4">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onDelete(row.id)}
                      disabled={!canDelete || isDeleting}
                      className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
