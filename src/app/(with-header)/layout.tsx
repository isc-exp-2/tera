import type { PropsWithChildren } from "react";
import { CenteredLayout } from "@/components/centered-layout";
// import { Header } from "@/features/header/components/header";
import { HeaderServ } from "@/features/header/components/header-serv";

export default function ({ children }: PropsWithChildren) {
  return (
    <>
      <HeaderServ />
      <CenteredLayout>{children}</CenteredLayout>
    </>
  );
}
