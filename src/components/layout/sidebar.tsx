import { APP_NAME } from "@/lib/constants";

import { NavItem } from "@/components/layout/nav-item";

export function Sidebar() {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-[#222222] bg-[#0f0f0f] p-6">
      <div>
        <div className="text-xs uppercase tracking-[0.05em] text-[#666666]">Developer intelligence</div>
        <div className="mt-2 text-2xl font-light text-white">{APP_NAME}</div>
      </div>
      <nav className="mt-8 space-y-2">
        <NavItem href="/dashboard" label="Dashboard" />
        <NavItem href="/search" label="Search" />
        <NavItem href="/compare" label="Compare" />
        <NavItem href="/ecosystem" label="Ecosystem" />
        <NavItem href="/alerts" label="Alerts" />
      </nav>
    </aside>
  );
}
