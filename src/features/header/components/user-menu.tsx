"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelf } from "@/features/user/hooks/use-self";
import { logOut } from "@/features/user/log-out";
import { useDepartmentByIdQuery } from "@/features/user/queries/use-department-by-id-query";

const nemu = (label: string, value: React.ReactNode) => (
  <DropdownMenuLabel>
    <p className="text-gray-500 text-xs">{label}</p>
    <span className="rounded py-1 text-black text-sm">{value}</span>
  </DropdownMenuLabel>
);

export function UserMenu() {
  const self = useSelf();
  const department = useDepartmentByIdQuery(self.departmentId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="mr-5 h-10 w-10 cursor-pointer">
          <AvatarImage src={self.picture} />
          <AvatarFallback>{self.firstName}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 font-normal font-sans">
        {nemu("氏名", `${self.lastName} ${self.firstName}`)}

        {nemu("メールアドレス", <span className="text-xs">{self.email}</span>)}

        {nemu("入学年度", `${self.enrollmentYear}年`)}

        {nemu("学科", department.data?.name)}

        {nemu("権限", self.role)}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer text-red-600"
          onClick={async () => {
            await logOut();
          }}
        >
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
