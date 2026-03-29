"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export function SearchBar() {
  const [query, setQuery] = useState("react-query");

  return (
    <div className="flex flex-col gap-3 rounded-none border border-[#222222] bg-[#111111] p-4 md:flex-row md:items-center">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search packages, repos, or ecosystems"
        className="h-11 flex-1 border border-[#222222] bg-[#0a0a0a] px-4 text-sm text-white outline-none placeholder:text-[#666666] focus:border-[#333333]"
      />
      <Button>Search</Button>
    </div>
  );
}
