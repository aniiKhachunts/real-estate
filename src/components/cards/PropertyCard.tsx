import { Link } from "react-router-dom";
import type { Property } from "../../lib/types";
import { bedsBaths, money } from "../../lib/format";
import { useSaved } from "../../app/store";
import { useCompare } from "../../app/compareStore.ts";

const PLACEHOLDER_IMG =
    "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop";

export default function PropertyCard({ p }: { p: Property }) {
    const toggle = useSaved((s) => s.toggle);
    const saved = useSaved((s) => s.isSaved(p.id));
    const cover = p.images?.[0] || PLACEHOLDER_IMG;
    const inCompare = useCompare(s => s.ids.includes(p.id));
    const toggleCompare = useCompare(s => s.toggle);

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border flex flex-col">
            <Link to={`/property/${p.id}`} className="relative block aspect-[4/3] overflow-hidden">
                <img
                    src={cover}
                    alt={p.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG;
                    }}
                />

                <div
                    className="absolute left-2 top-2 text-xs font-semibold bg-white/90 backdrop-blur px-2 py-1 rounded">
                    {money(p.price)}
                </div>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggle(p.id);
                    }}
                    className={`absolute right-2 top-2 h-9 w-9 rounded-full grid place-items-center shadow-sm
            ${saved ? "bg-rose-600 text-white" : "bg-white/90 text-slate-700 hover:bg-white"}`}
                    aria-label={saved ? "Unsave listing" : "Save listing"}
                    title={saved ? "Unsave" : "Save"}
                >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                        <path
                            d="M12 21s-6.7-4.2-9.2-7.1C.7 11.6.5 8.7 2.4 6.9A5.2 5.2 0 0 1 12 7.1a5.2 5.2 0 0 1 9.6-.2c1.9 1.8 1.7 4.7-.4 7-2.5 2.9-9.2 7.1-9.2 7.1z"/>
                    </svg>
                </button>
                <button
                    onClick={() => toggleCompare(p.id)}
                    className={`text-xs px-2 py-1 rounded border ${inCompare ? "bg-indigo-600 text-white border-indigo-600" : "bg-white"}`}
                >
                    {inCompare ? "In compare" : "Compare"}
                </button>
            </Link>

            <div className="p-4 flex-1">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold leading-tight">
                        <Link to={`/property/${p.id}`}>{p.title}</Link>
                    </h3>

                    <button
                        onClick={() => toggle(p.id)}
                        aria-label={saved ? "Unsave listing" : "Save listing"}
                        title={saved ? "Unsave" : "Save"}
                        className={`text-xs px-2 py-1 rounded transition
              ${saved ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-100/80"}`}
                    >
                        {saved ? "Saved" : "Save"}
                    </button>
                </div>

                <div className="mt-1 text-brand-600 font-semibold">{money(p.price)}</div>
                <div className="mt-1 text-sm text-slate-600">
                    {p.address.city}
                    {p.address.area ? `, ${p.address.area}` : ""}
                </div>
                <div className="mt-2 text-sm text-slate-700">
                    {bedsBaths(p.beds, p.baths)} • {p.areaM2} m² • {p.type}
                </div>
            </div>
        </div>
    );
}
