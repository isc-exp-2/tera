import { Pen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddProjectForm } from "@/features/project/components/add-project-form";

export function ProjectManagePage() {
  return (
    <>
      <p className="my-4">案件統計</p>
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-4">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle className="text-sm">登録案件数</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl">〇〇件</CardContent>
        </Card>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle className="text-sm">EXP.案件</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl">〇〇件</CardContent>
        </Card>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle className="text-sm">外部案件</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl">〇〇件</CardContent>
        </Card>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle className="text-sm">EXP.合計金額</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl">〇〇件</CardContent>
        </Card>
      </div>
      <div className="my-8 rounded-lg border border-blue-200 bg-blue-50 p-6 text-left text-blue-900 text-sm">
        <p className="mb-1.5">案件について</p>
        <ul className="ml-2.5 list-disc">
          <li className="mb-1">交通費申請時に選択できる案件を管理します</li>
          <li className="mb-1">案件を選択すると、金額が自動的に反映されます</li>
          <li className="mb-1">EXP.案件は、EXP.が費用を負担する案件です</li>
        </ul>
      </div>
      <div className="mb-5 flex justify-between">
        <p>登録案件一覧</p>
        <AddProjectForm />
      </div>
      <div>
        <Table className="mb-6 overflow-hidden rounded-xl">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-25 text-left">案件名</TableHead>
              <TableHead className="w-12.5 text-left">金額</TableHead>
              <TableHead className="w-5 text-left">ステータス</TableHead>
              <TableHead className="w-12.5 text-left">登録者</TableHead>
              <TableHead className="w-12.5 text-left">登録日</TableHead>
              <TableHead className="w-5 text-left">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            <TableRow>
              <TableCell className="py-4">コメット小学校</TableCell>
              <TableCell className="py-4">￥500</TableCell>
              <TableCell className="py-4">
                <Badge className="bg-sky-50 p-3 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                  EXP
                </Badge>
              </TableCell>
              <TableCell className="py-4">山田太郎</TableCell>
              <TableCell className="py-4">2024/01/01</TableCell>
              <TableCell className="py-4">
                <Pen className="h-4 w-4 text-indigo-600" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-4">コメット小学校</TableCell>
              <TableCell className="py-4">￥500</TableCell>
              <TableCell className="py-4">
                <Badge className="bg-purple-50 p-3 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                  外部案件
                </Badge>
              </TableCell>
              <TableCell className="py-4">山田太郎</TableCell>
              <TableCell className="py-4">2024/01/01</TableCell>
              <TableCell className="py-4">
                <Pen className="h-4 w-4 text-indigo-600" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
