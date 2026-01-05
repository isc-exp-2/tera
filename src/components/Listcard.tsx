import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LucideIcon } from "lucide-react";
import Link from "next/link";

type ListcardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconclassName: string;
  href: string;
};

export default function Listcard({ title, description, icon, iconclassName, href }: ListcardProps) {
    const IconComponent = icon;
    return (
        <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid gap-6">
            <Link href={href}>
                <Card>
                    <CardHeader>
                        <div  className="bg-indigo-100 rounded-md w-12 h-12 mb-4 flex items-center justify-center">
                            <IconComponent className={iconclassName} />
                        </div>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
        </div>
    )
}