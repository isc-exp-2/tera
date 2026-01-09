import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ListCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconClassName: string;
  href: string;
};

export function ListCard({
  title,
  description,
  icon,
  iconClassName,
  href,
  iconBg,
}: ListCardProps) {
  const IconComponent = icon;
  return (
    <Link href={href}>
      <Card>
        <CardHeader>
          <div
            className={clsx(
              "mb-4 flex h-12 w-12 items-center justify-center rounded-md",
              iconBg,
            )}
          >
            <IconComponent className={iconClassName} />
          </div>
          <CardTitle className="mb-2 text-gray-900">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
