import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import FilterBar from "../components/filters/FilterBar";
import PropertyCard from "../components/cards/PropertyCard";
import SkeletonCard from "../components/common/SkeletonCard";
import EmptyState from "../components/common/EmptyState";
import Pagination from "../components/common/Pagination";
import { type Filters, getFiltered } from "../lib/api";
import type { Property } from "../lib/types";

const toNum = (v: string | null) => (v !== null && v !== "" ? Number(v) : undefined);
const PAGE_SIZE = 12;

export default function Listings() {
    const [sp, setSp] = useSearchParams();

    const initial: Filters = useMemo(
        () => ({
            city: sp.get("city") ?? "",
            minPrice: toNum(sp.get("minPrice")),
            maxPrice: toNum(sp.get("maxPrice")),
            beds: toNum(sp.get("beds")),
            baths: toNum(sp.get("baths")),
            type: (sp.get("type") as any) ?? "any",
            sort: (sp.get("sort") as any) ?? "newest",
        }),
        []
    );

    const page = Math.max(1, Number(sp.get("page") || "1") || 1);

    const { data, isLoading, isError, refetch } = useQuery<Property[]>({
        queryKey: ["listings", initial, sp.toString()],
        queryFn: () =>
            getFiltered({
                city: sp.get("city") ?? "",
                minPrice: toNum(sp.get("minPrice")),
                maxPrice: toNum(sp.get("maxPrice")),
                beds: toNum(sp.get("beds")),
                baths: toNum(sp.get("baths")),
                type: (sp.get("type") as any) ?? "any",
                sort: (sp.get("sort") as any) ?? "newest",
            }),
    });

    const resetToFirstPage = () => {
        const next = new URLSearchParams(sp);
        next.set("page", "1");
        setSp(next, { replace: true });
    };

    const onFiltersChange = (f: Filters) => {
        const next = new URLSearchParams();
        if (f.city) next.set("city", f.city);
        if (f.minPrice != null) next.set("minPrice", String(f.minPrice));
        if (f.maxPrice != null) next.set("maxPrice", String(f.maxPrice));
        if (f.beds != null) next.set("beds", String(f.beds));
        if (f.baths != null) next.set("baths", String(f.baths));
        if (f.type && f.type !== "any") next.set("type", String(f.type));
        if (f.sort && f.sort !== "newest") next.set("sort", String(f.sort));
        next.set("page", "1");
        setSp(next, { replace: true });
    };

    useEffect(() => {
        if (!data) return;
        const total = data.length;
        const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
        if (page > totalPages) {
            const next = new URLSearchParams(sp);
            next.set("page", String(totalPages));
            setSp(next, { replace: true });
        }
    }, [data, page, sp, setSp]);

    const total = data?.length ?? 0;
    const start = (page - 1) * PAGE_SIZE;
    const visible = (data ?? []).slice(start, start + PAGE_SIZE);

    const onPageChange = (p: number) => {
        const next = new URLSearchParams(sp);
        next.set("page", String(p));
        setSp(next, { replace: true });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="bg-slate-50 min-h-[80vh]">
            <div className="sticky top-0 z-20">
                <FilterBar initial={initial} onChange={onFiltersChange}/>
            </div>

            <div className="mx-auto w-full max-w-[1200px] px-4 py-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg md:text-xl font-semibold text-slate-900">
                        {isLoading ? "Loading…" : `${total} home${total === 1 ? "" : "s"}`}
                    </h1>
                </div>

                <div className="mt-6 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {isLoading &&
                        Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i}/>)}
                    {!isLoading && visible.map((p) => <PropertyCard key={p.id} p={p}/>)}
                </div>

                {isError && (
                    <div className="mt-6">
                        <EmptyState
                            title="Failed to load listings."
                            hint="Please check your connection or try again."
                            action={
                                <button onClick={() => refetch()} className="px-4 py-2 rounded bg-slate-900 text-white">
                                    Retry
                                </button>
                            }
                        />
                    </div>
                )}

                {!isLoading && !isError && total === 0 && (
                    <div className="mt-6">
                        <EmptyState
                            title="No results"
                            hint="Try widening your price range or clearing filters."
                            action={
                                <button onClick={resetToFirstPage} className="px-4 py-2 rounded border">
                                    Clear filters
                                </button>
                            }
                        />
                    </div>
                )}

                {!isLoading && !isError && total > PAGE_SIZE && (
                    <Pagination total={total} page={page} pageSize={PAGE_SIZE} onPageChange={onPageChange}/>
                )}
            </div>
        </div>
    );
}
