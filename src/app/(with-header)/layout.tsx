import type { PropsWithChildren } from "react";
import { Header } from "@/features/header/components/header";

export default function ({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
