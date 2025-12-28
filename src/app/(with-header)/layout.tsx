import type { PropsWithChildren } from "react";
import { CenteredLayout } from "@/components/centered-layout";
import { Header } from "@/features/header/components/header";

export default function ({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <CenteredLayout>{children}</CenteredLayout>
    </>
  );
}
