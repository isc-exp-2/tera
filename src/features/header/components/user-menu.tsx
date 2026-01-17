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

export function UserMenu() {
  const self = useSelf(true);
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
        <DropdownMenuLabel>
          <p className="text-gray-500 text-xs">ユーザー名</p>

          <span className="rounded py-1 text-black text-sm">
            {self.lastName} {self.firstName}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuLabel>
          <p className="text-gray-500 text-xs">登録メールアドレス</p>
          <span className="rounded py-1 text-black text-xs">{self.email}</span>
        </DropdownMenuLabel>

        <DropdownMenuLabel>
          <p className="text-gray-500 text-xs">入学年度</p>
          <span className="rounded py-1 text-black text-sm">
            {self.enrollmentYear}年
          </span>
        </DropdownMenuLabel>

        <DropdownMenuLabel>
          <p className="text-gray-500 text-xs">所属学科</p>
          <span className="rounded py-1 text-black text-sm">
            {department.data?.name}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuLabel>
          <p className="text-gray-500 text-xs">権限</p>
          <span className="rounded py-1 text-black text-sm">{self.role}</span>
        </DropdownMenuLabel>

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
