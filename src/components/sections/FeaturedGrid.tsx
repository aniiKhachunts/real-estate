import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAllProperties } from "../../lib/api";
import PropertyCard from "../cards/PropertyCard";

export default function FeaturedGrid() {
    const { data } = useQuery({ queryKey: ["all"], queryFn: getAllProperties });
    const featured = (data ?? []).slice(0, 6);

    return (
        <section className="bg-white">
            <div className="mx-auto w-full max-w-[1200px] px-4 py-16">
                <div className="flex items-end justify-between">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Featured listings</h2>
                    <Link to="/listings" className="text-brand-600 hover:underline text-sm">View all</Link>
                </div>

                <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                    {featured.map((p) => (
                        <div key={p.id} className="h-full">
                            <PropertyCard p={p}/>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
