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

  return (
    <Button
      className="justify-start gap-2"
      variant={pathname === href ? "secondary" : "ghost"}
      asChild
    >
      <Link {...props} href={href}>
        {children}
      </Link>
    </Button>
  );
};

export default SidebarButton;
