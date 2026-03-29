import Link from "next/link";

import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  label: string;
  isActive?: boolean;
}

export function NavItem({ href, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block rounded-none border border-transparent px-3 py-2 text-sm text-[#a1a1a1] transition-colors hover:border-[#333333] hover:bg-[#111111] hover:text-white",
        isActive && "border-[#333333] bg-[#111111] text-white",
      )}
    >
      {label}
    </Link>
  );
}
