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

      <DropdownMenuContent align="end" className="w-56 font-medium text-sm">
        <DropdownMenuLabel>
          <span className="rounded py-1">
            {self.firstName} {self.lastName}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <span className="rounded bg-gray-50 py-1">{self.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <span className="rounded py-1">{self.enrollmentYear}</span>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <span className="rounded py-1">{department.data?.name}</span>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <span className="rounded py-1">{self.role}</span>
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
