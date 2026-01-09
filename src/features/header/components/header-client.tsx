"use client";

import Link from "next/link";
import { useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { AuthSelf } from "@/entities/self";
import { logOut } from "@/features/user/log-out";

type Props = {
  authSelf: AuthSelf | null;
};

export function HeaderClient({ authSelf }: Props) {
  const [isPending, startTransition] = useTransition();

  if (!authSelf) {
    return (
      <Link href="/login" className="font-medium text-sm hover:underline">
        ログイン
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="mr-5 h-10 w-10 cursor-pointer">
          <AvatarImage
            src={authSelf.picture ?? undefined}
            alt={authSelf.email ?? "user"}
          />
          <AvatarFallback>
            {authSelf.email?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <span className="font-medium text-sm">{authSelf.email}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-600"
          disabled={isPending}
          onClick={() =>
            startTransition(() => {
              logOut(); // Server Action
            })
          }
        >
          {isPending ? "ログアウト中..." : "ログアウト"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
