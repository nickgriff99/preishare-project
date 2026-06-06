"use client";

import { ASSET_CLASS_LABELS } from "@/lib/listing-constants";
import type { AssetClass } from "@/types/database";
import { useRouter, useSearchParams } from "next/navigation";

const assetClasses = Object.keys(ASSET_CLASS_LABELS) as AssetClass[];

export function ListingsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentClass = searchParams.get("asset") ?? "";
  const currentState = searchParams.get("state") ?? "";
  const search = searchParams.get("q") ?? "";

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/listings?${params.toString()}`);
  }

  return (
    <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:items-end lg:gap-6">
      <div className="min-w-0 sm:col-span-2 lg:col-span-6">
        <label htmlFor="search" className="text-sm text-muted">
          Search
        </label>
        <input
          id="search"
          type="search"
          placeholder="City or title..."
          defaultValue={search}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              update("q", (e.target as HTMLInputElement).value);
            }
          }}
          className="form-field"
        />
      </div>
      <div className="min-w-0 lg:col-span-4">
        <label htmlFor="asset" className="text-sm text-muted">
          Asset class
        </label>
        <select
          id="asset"
          value={currentClass}
          onChange={(e) => update("asset", e.target.value)}
          className="form-field"
        >
          <option value="">All types</option>
          {assetClasses.map((ac) => (
            <option key={ac} value={ac}>
              {ASSET_CLASS_LABELS[ac]}
            </option>
          ))}
        </select>
      </div>
      <div className="min-w-0 lg:col-span-2">
        <label htmlFor="state" className="text-sm text-muted">
          State
        </label>
        <input
          id="state"
          type="text"
          placeholder="TX"
          maxLength={2}
          defaultValue={currentState}
          onBlur={(e) => update("state", e.target.value.toUpperCase())}
          className="form-field"
        />
      </div>
    </div>
  );
}
