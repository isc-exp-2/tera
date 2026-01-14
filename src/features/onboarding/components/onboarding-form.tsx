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
import { Skeleton } from "@/components/ui/skeleton";
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
  const { data: departments = [], isPending } = useDepartmentsQuery();
  const [lastName, setLastName, lastNameError] = useFormValue("", LastName);
  const [firstName, setFirstName, firstNameError] = useFormValue("", FirstName);
  const [enrollmentYear, setYear, yearError] = useFormValue("", EnrollmentYear);
  const [departmentId, setDepartment, departmentError] = useFormValue(
    "",
    Department,
  );
  const enrollmentYears = Years();

  const [isSubmitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLastName(lastName);
    setFirstName(firstName);
    setYear(enrollmentYear);
    setDepartment(departmentId);
    if (lastNameError || firstNameError || yearError || departmentError) {
      alert("すべての必須項目を入力してください");
      setSubmitting(false);
      return;
    }

    setSubmitting(true);

    try {
      await registerSelf({
        lastName,
        firstName,
        enrollmentYear,
        departmentId,
      });
      router.push(urls.home);
    } finally {
      setSubmitting(false);
    }
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
              {isPending ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <OnboardingSelect
                  label="入学年度"
                  placeholder="学年を選択してください"
                  values={enrollmentYears}
                  value={enrollmentYear}
                  onChange={setYear}
                  disabled={isPending}
                />
              )}
            </div>
            <div className="mb-5">
              {isPending ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <OnboardingSelect
                  label="学科"
                  placeholder="学科を選択してください"
                  values={departments.map((d) => ({ id: d.id, name: d.name }))}
                  value={departmentId}
                  onChange={setDepartment}
                  disabled={isPending}
                />
              )}
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
  disabled: boolean;
};

function OnboardingSelect({
  label,
  placeholder,
  values,
  value,
  onChange,
  disabled = false,
}: OnboardingSelectProps) {
  return (
    <>
      <Label className="mb-2 text-muted-foreground">
        {label} <span className="text-red-500">*</span>
      </Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-full bg-gray-100" disabled={disabled}>
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

function Years() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const startYear = currentYear - 4;
  const years: { id: string; name: string }[] = [];

  for (let y = currentYear; y >= startYear; y--) {
    if (y === currentYear && currentMonth < 4) continue;

    years.push({
      id: String(y),
      name: `${y}年`,
    });
  }

  return years;
}
