"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ExpLogo } from "@/components/exp-logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { urls } from "@/constants";
import {
  Department,
  EnrollmentYear,
  FirstName,
  LastName,
} from "@/entities/self";
import { useDepartmentsQuery } from "@/features/user/queries/use-departments-query";
import { registerSelf } from "@/features/user/register-self";
import { useFormValue } from "@/hooks/useFormValue";

export function OnboardingForm() {
  const router = useRouter();
  const { data: departments = [], isLoading } = useDepartmentsQuery();
  const [lastName, setLastName, lastNameError] = useFormValue("", LastName);
  const [firstName, setFirstName, firstNameError] = useFormValue("", FirstName);
  const [year, setYear] = useFormValue("", EnrollmentYear);
  const [department, setDepartment] = useFormValue("", Department);

  const [isSubmitting, setSubmitting] = useState(false);

  if (isLoading) {
    return;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLastName(lastName);
    setFirstName(firstName);
    const yearInvalid = year === "";
    const departmentInvalid = department === "";
    if (lastNameError || firstNameError || yearInvalid || departmentInvalid) {
      alert("すべての必須項目を入力してください");
      return;
    }

    setSubmitting(true);

    await registerSelf({
      lastName,
      firstName,
      enrollmentYear: Number(year),
      departmentId: department,
    });

    router.push(urls.home);
  }
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
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="mb-5 grid grid-cols-2 gap-2">
                <div>
                  <Label className="mb-2 text-muted-foreground">
                    姓<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    placeholder="山田"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {lastNameError && (
                    <p className="mt-1 text-red-500 text-sm">{lastNameError}</p>
                  )}
                </div>
                <div>
                  <Label className="mb-2 text-muted-foreground">
                    名<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    placeholder="太郎"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {firstNameError && (
                    <p className="mt-1 text-red-500 text-sm">
                      {firstNameError}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-5">
              <OnboardingSelect
                label="入学年度"
                placeholder="学年を選択してください"
                values={[
                  { id: "2023", name: "2023年" },
                  { id: "2024", name: "2024年" },
                  { id: "2025", name: "2025年" },
                  { id: "2026", name: "2026年" },
                ]}
                value={year}
                onChange={setYear}
              />
            </div>
            <div className="mb-5">
              <OnboardingSelect
                label="学科"
                placeholder="学科を選択してください"
                values={departments.map((d) => ({ id: d.id, name: d.name }))}
                value={department}
                onChange={setDepartment}
              />
            </div>
            <Button
              type="submit"
              className="w-full py-5"
              disabled={isSubmitting}
            >
              <p> 登録してホームへ</p>
            </Button>
          </form>
        </CardContent>
        <div className="mx-8 rounded-lg border border-blue-200 bg-blue-50 p-4 text-left text-blue-900 text-sm">
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

type OnboardingSelectProps = {
  label: string;
  placeholder: string;
  values: { id: string; name: string }[];
  value: string;
  onChange: (value: string) => void;
};

export function OnboardingSelect({
  label,
  placeholder,
  values,
  value,
  onChange,
}: OnboardingSelectProps) {
  return (
    <>
      <Label className="mb-2 text-muted-foreground">
        {label} <span className="text-red-500">*</span>
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-gray-100">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {values.map((item) => (
            <SelectItem key={item.id} value={String(item.id)}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
