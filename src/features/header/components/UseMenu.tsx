// user-menu.tsx
"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { login } from "@/constants/urls";
import type { AuthSelf } from "@/entities/self";
import { logOut } from "@/features/user/log-out";

type Props = {
  authSelf: AuthSelf | null;
};

export function UserMenu({ authSelf }: Props) {
  if (!authSelf) {
    return (
      <Link
        href={login}
        className="inline-block rounded bg-blue-600 px-4 py-2 font-medium text-sm text-white hover:bg-blue-700"
      >
        ログイン
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="mr-5 h-10 w-10 cursor-pointer">
          <AvatarImage src={authSelf.picture ?? undefined} />
          <AvatarFallback>
            {authSelf.email?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 font-medium text-sm">
        {/* <DropdownMenuLabel>
          <span className="rounded bg-gray-50 py-1">{authSelf.uid}</span>
        </DropdownMenuLabel> */}

        <DropdownMenuLabel>
          <span className="rounded bg-gray-50 py-1">{authSelf.email}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-red-600" onClick={() => logOut()}>
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
