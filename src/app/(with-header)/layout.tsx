import type { PropsWithChildren } from "react";
import { CenteredLayout } from "@/components/centered-layout";
import { Header } from "@/features/header/components/header";

export default function ({ children }: PropsWithChildren) {
  return (
    <div>
      <Header 
      title="申請管理"
      subtitle="全ての申請を承認・精算"
       />
      <CenteredLayout>
        <div className="py-6">{children}</div>
      </CenteredLayout>
      </div>
  );
}
