import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CenteredLayoutProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * 水平中央寄せのレイアウトコンポーネント
 * 最大幅を設定し、コンテンツを中央に配置します。
 */
export function CenteredLayout({
  children,
  className,
  ...props
}: CenteredLayoutProps) {
  return (
    <div
      className={cn("flex w-full items-center justify-center", className)}
      {...props}
    >
      <div className="container max-w-7xl px-4 md:px-6">{children}</div>
    </div>
  );
}
