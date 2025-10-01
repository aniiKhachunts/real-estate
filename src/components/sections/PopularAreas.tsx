import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type PopularArea = {
    city: string;
    listings: number;
    img: string;
};

export default function PopularAreas() {
    const [areas, setAreas] = useState<PopularArea[]>([]);

    useEffect(() => {
        fetch("/data/popular-areas.json")
            .then((r) => r.json())
            .then((data: PopularArea[]) => setAreas(data))
            .catch(() => setAreas([]));
    }, []);

    return (
        <section className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between mb-4">
                <h2 className="text-2xl font-semibold">Popular areas</h2>
                {areas.length > 0 && (
                    <div className="text-sm text-slate-500">Based on {areas.reduce((n,a)=>n+a.listings,0)} listings across top cities</div>
                )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {areas.map((a) => (
                    <Link
                        key={a.city}
                        to={`/listings?city=${encodeURIComponent(a.city)}`}
                        className="relative rounded-2xl overflow-hidden shadow focus:outline-none focus:ring-2 focus:ring-brand-500"
                        aria-label={`See listings in ${a.city}`}
                    >
                        <img
                            src={a.img}
                            alt={a.city}
                            className="h-48 w-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                    "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&h=1000&fit=crop&auto=format";
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                        <div className="absolute bottom-3 left-3 text-white drop-shadow">
                            <div className="font-medium">{a.city}</div>
                            <div className="text-sm opacity-90">{a.listings} listings</div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
