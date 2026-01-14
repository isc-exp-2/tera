import { CenteredLayout } from "@/components/centered-layout";
import { ExpLogo } from "@/components/exp-logo";
import { home } from "@/constants/urls";
import { getAuthSelf } from "@/features/user/get-self";
import { UserMenu } from "./usermenu";

export async function Header() {
  const authSelf = await getAuthSelf();

  return (
    <header className="border-b bg-white">
      <CenteredLayout>
        <div className="flex h-20 items-center justify-between">
          <Logo />
          <UserMenu authSelf={authSelf} />
        </div>
      </CenteredLayout>
    </header>
  );
}

import Link from "next/link";

function Logo() {
  return (
    <div className="ml-14 flex items-center gap-4">
      <Link
        href={home}
        aria-label="トップページへ"
        className="hover:opacity-80"
      >
        <ExpLogo className="h-12 w-auto cursor-pointer" />
      </Link>
      <span className="hidden origin-center whitespace-nowrap font-medium font-sans text-2xl sm:inline">
        交通費精算
        <span className="inline-block origin-left scale-x-80">システム</span>
      </span>
    </div>
  );
}
