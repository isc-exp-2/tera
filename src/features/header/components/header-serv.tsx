import Link from "next/link";

import { getAuthSelf } from "@/features/user/get-self";
import { HeaderShell } from "./header-shell";
import { HeaderClient } from "./header-client";

import Image from "next/image";
import exp from "./EXP.png";


export async function HeaderServ() {
  const authSelf = await getAuthSelf();

  return (
    <HeaderShell>
      {/* 左：ロゴ＋名前 */}
      <div className="flex items-center gap-2 font-bold pl-10">
        <Link href="/" className="hover:opacity-80">
          <div className="h-15 w-15 rounded bg-white font-extralight relative">
            <Image
              src={exp}
              alt="logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <span className="">交通費精算システム</span>
      </div>

      {/* 右：ユーザー操作 */}
      <HeaderClient authSelf={authSelf} />
    </HeaderShell>
  );
}
