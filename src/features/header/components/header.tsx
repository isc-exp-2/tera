import Link from "next/link";
import { CenteredLayout } from "@/components/centered-layout";
import { ExpLogo } from "@/components/exp-logo";
import { home } from "@/constants/urls";
import { UserMenu } from "./user-menu";

type HeaderProps = {
  title?: string;
  subtitle?: string;
};

export async function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="border-b bg-white">
      <CenteredLayout>
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-6">
            <Logo />

            {(title || subtitle) && (
               <div className="flex flex-col leading-tight">
                  {title && (
                    <span className="font-semibold text-gray-800 text-lg">
                {title}
              </span>
            )}
                  {subtitle && (
                    <span className="text-gray-500 text-sm">
                {subtitle}
              </span>
            )}
          </div>
            )}
          </div>

          <UserMenu />
        </div>
      </CenteredLayout>
    </header>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-4">
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
