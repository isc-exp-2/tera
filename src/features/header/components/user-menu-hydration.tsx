"use client";

import dynamic from "next/dynamic";

const UserMenu = dynamic(
  () => import("./user-menu").then((mod) => mod.UserMenu),
  {
    ssr: false,
  },
);

export function UserMenuHydration() {
  return <UserMenu />;
}
