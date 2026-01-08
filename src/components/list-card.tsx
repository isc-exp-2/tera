import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

type ListCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconbg: string;
  iconclassName: string;
  href: string;
};

export default function ListCard({
  title,
  description,
  icon,
  iconclassName,
  href,
  iconbg,
}: ListCardProps) {
  const IconComponent = icon;
  return (
    <Link href={href}>
      <Card>
        <CardHeader>
          <div
            className={
              "rounded-md w-12 h-12 mb-4 flex items-center justify-center " +
              iconbg
            }
          >
            <IconComponent className={iconclassName} />
          </div>
          <CardTitle className="mb-2 text-gray-900">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
