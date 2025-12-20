"use client";

import Link, { type LinkProps } from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface SidebarButtonProps extends LinkProps {
  children: ReactNode;
}

const SidebarButton = ({ children, href, ...props }: SidebarButtonProps) => {
  const pathname = usePathname();
  const isCurrentPath = pathname === href;

  return (
    <Button
      className={`justify-start gap-2 px-6 py-3 text-sm font-medium hover:bg-emerald-50 ${isCurrentPath ? "bg-emerald-50 font-semibold text-emerald-500" : "bg-transparent text-slate-500 hover:text-emerald-500"}`}
      asChild
    >
      <Link {...props} href={href}>
        {children}
      </Link>
    </Button>
  );
};

export default SidebarButton;
