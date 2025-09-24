import { useQuery } from "@tanstack/react-query";
import { getAllProperties } from "../lib/api";
import { useSaved } from "../app/store";
import PropertyCard from "../components/cards/PropertyCard";
import EmptyState from "../components/common/EmptyState";
import { Link } from "react-router-dom";

export default function Saved() {
    const ids = useSaved(s => s.savedIds);
    const { data } = useQuery({ queryKey: ["all"], queryFn: getAllProperties });
    const items = (data ?? []).filter(p => ids.includes(p.id));

    return (
        <div className="bg-slate-50">
            <div className="mx-auto max-w-[1200px] px-4 py-8">
                <h1 className="text-2xl font-bold">Saved homes</h1>

                {items.length === 0 ? (
                    <div className="mt-6">
                        <EmptyState
                            title="No saved homes yet"
                            hint="Explore listings and click the heart to save your favorites."
                            action={<Link to="/listings" className="px-4 py-2 rounded bg-brand-600 text-white">Browse
                                listings</Link>}
                        />
                    </div>
                ) : (
                    <div className="mt-6 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {items.map(p => <PropertyCard key={p.id} p={p}/>)}
                    </div>
                )}
            </div>
        </div>
    );
}
