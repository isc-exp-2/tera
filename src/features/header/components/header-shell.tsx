import type { PropsWithChildren } from "react";
import { CenteredLayout } from "@/components/centered-layout";

export function HeaderShell({ children }: PropsWithChildren) {
  return (
    <header className="border-b">
      <CenteredLayout>
        <div className="flex h-20 items-center justify-between">{children}</div>
      </CenteredLayout>
    </header>
  );
}
