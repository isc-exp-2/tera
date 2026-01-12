"use client";

import { ExpLogo } from "@/components/exp-logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function OnboardingForm() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-xl text-center">
        <CardHeader>
          <div className="flex justify-center">
            <ExpLogo className="mb-4 h-20 w-auto" loading="eager" />
          </div>
          <CardTitle>プロフィール登録</CardTitle>
          <CardDescription>初回ログイン時の登録が必要です</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="mb-5 grid grid-cols-2 gap-2">
                <div>
                  <Label className="mb-2 text-muted-foreground">
                    姓<span className="text-red-500">*</span>
                  </Label>
                  <Input type="text" placeholder="山田" />
                </div>
                <div>
                  <Label className="mb-2 text-muted-foreground">
                    名<span className="text-red-500">*</span>
                  </Label>
                  <Input type="text" placeholder="太郎" />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <OnbordingSelect
                label="入学年度"
                placeholder="学年を選択してください"
                values={["2024年", "2025年", "2026年", "2027年"]}
              />
            </div>
            <div>
              <OnbordingSelect
                label="学科"
                placeholder="学科を選択してください"
                values={[
                  "情報システム科",
                  "情報デザイン科",
                  "デジタルエンターテインメント科",
                  "グラフィックデザイン科",
                  "その他",
                ]}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            登録してホームへ
          </Button>
        </CardFooter>
        <div className="mx-8 rounded-lg border-1 border-blue-200 bg-blue-50 p-4 text-left text-blue-900 text-sm">
          <p className="mb-1.5">注意事項</p>
          <ul className="ml-2.5 list-disc">
            <li className="mb-1">登録後、権限は「メンバー」に設定されます</li>
            <li>プロフィール作成日時は自動的に保存されます</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}

type OnbordingSelectProps = {
  label: string;
  placeholder: string;
  values: string[];
};

export function OnbordingSelect({
  label,
  placeholder,
  values,
}: OnbordingSelectProps) {
  return (
    <>
      <Label className="mb-2 text-muted-foreground">
        {label} <span className="text-red-500">*</span>
      </Label>
      <Select>
        <SelectTrigger className="w-full bg-gray-100">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {values.map((year) => (
            <SelectItem key={year} value={String(year)}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
