"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { Suspense } from "react";

const CATEGORIES = ["All", "Banana", "Guava", "Mango", "Papaya", "Strawberry"];
const TYPES = ["All", "Healthy", "Disease"];

function FilterBarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentCategory = searchParams.get("category") || "All";
  const currentType = searchParams.get("type") || "All";

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const getButtonClass = (isActive: boolean) => {
    return `px-6 py-2 rounded-full font-medium tracking-tight shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#22c55e]/50 ${
      isActive
        ? "border-2 border-[#22c55e] text-[#16a34a] bg-[#22c55e]/10"
        : "border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:border-[#22c55e]/50"
    }`;
  };

  return (
    <section className="mb-12 flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-bold text-stone-500 uppercase tracking-widest mr-2">Category</span>
        {CATEGORIES.map((cat) => {
          const isActive = currentCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => handleFilterChange("category", cat.toLowerCase())}
              className={getButtonClass(isActive)}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-bold text-stone-500 uppercase tracking-widest mr-2">Status</span>
        {TYPES.map((type) => {
          const isActive = currentType.toLowerCase() === type.toLowerCase();
          return (
            <button
              key={type}
              onClick={() => handleFilterChange("type", type.toLowerCase())}
              className={getButtonClass(isActive)}
            >
              {type}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function FilterBar() {
  return (
    <Suspense fallback={<div className="h-24 animate-pulse bg-stone-100 dark:bg-stone-900 rounded-xl mb-12"></div>}>
      <FilterBarContent />
    </Suspense>
  );
}
