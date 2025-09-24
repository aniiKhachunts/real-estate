import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Filters, getAllProperties } from "../../lib/api";

const IconSliders = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
        <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3"/>
        <circle cx="4" cy="14" r="2"/>
        <circle cx="12" cy="12" r="2"/>
        <circle cx="20" cy="16" r="2"/>
    </svg>
);
const IconSearch = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
        <circle cx="11" cy="11" r="7"/>
        <path d="M21 21l-4.3-4.3"/>
    </svg>
);
const IconHome = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
        <path d="M3 11l9-7 9 7"/>
        <path d="M9 22V12h6v10"/>
    </svg>
);
const IconB2 = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
    </svg>
);
const IconBuilding = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
        <path d="M3 21h18"/>
        <path d="M6 21V7l6-3 6 3v14"/>
        <path d="M9 21v-4h6v4"/>
    </svg>
);
const IconWarehouse = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
        <path d="M3 9l9-6 9 6"/>
        <path d="M4 10h16v10H4z"/>
        <path d="M7 20v-6h10v6"/>
    </svg>
);
const IconX = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
        <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
);
const IconPlus = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
        <path d="M12 5v14M5 12h14"/>
    </svg>
);
const IconMinus = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
        <path d="M5 12h14"/>
    </svg>
);
const IconChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
        <path d="M6 9l6 6 6-6"/>
    </svg>
);

type Props = { initial?: Filters; onChange: (v: Filters) => void };

function PillBtn({
                     active, children, onClick, ariaLabel,
                 }: { active?: boolean; children: React.ReactNode; onClick: () => void; ariaLabel?: string }) {
    return (
        <button
            type="button"
            aria-label={ariaLabel}
            onClick={onClick}
            className={[
                "h-9 px-3 rounded-full border transition whitespace-nowrap shadow-[0_0_0_1px_rgba(0,0,0,0.02)]",
                active
                    ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-500"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100/80",
            ].join(" ")}
        >
            {children}
        </button>
    );
}

function Stepper({
                     value, setValue, label, min = 0, max = 10,
                 }: {
    value?: number;
    setValue: (n: number | undefined) => void;
    label: string;
    min?: number;
    max?: number
}) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 w-14">{label}</span>
            <button
                type="button"
                className="h-8 w-8 grid place-items-center rounded-md border border-slate-200 bg-slate-100 hover:bg-slate-100/80"
                onClick={() => setValue(value && value > min ? value - 1 : undefined)}
                aria-label={`Decrease ${label}`}
            >
                <IconMinus width={16} height={16}/>
            </button>
            <input
                type="number"
                className="w-16 h-8 rounded-md border border-slate-200 bg-white/80 px-2 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
                value={value ?? ""}
                min={min}
                max={max}
                onChange={(e) => {
                    const v = e.target.value;
                    setValue(v === "" ? undefined : Math.max(min, Math.min(max, Number(v))));
                }}
            />
            <button
                type="button"
                className="h-8 w-8 grid place-items-center rounded-md border border-slate-200 bg-slate-100 hover:bg-slate-100/80"
                onClick={() => setValue((value ?? 0) + 1 > max ? max : (value ?? 0) + 1)}
                aria-label={`Increase ${label}`}
            >
                <IconPlus width={16} height={16}/>
            </button>
        </div>
    );
}

export default function FilterBar({ initial, onChange }: Props) {
    const [city, setCity] = useState(initial?.city ?? "");
    const [minPrice, setMin] = useState<number | undefined>(initial?.minPrice);
    const [maxPrice, setMax] = useState<number | undefined>(initial?.maxPrice);
    const [beds, setBeds] = useState<number | undefined>(initial?.beds);
    const [baths, setBaths] = useState<number | undefined>(initial?.baths);
    const [type, setType] = useState<Filters["type"]>(initial?.type ?? "any");
    const [sort, setSort] = useState<Filters["sort"]>(initial?.sort ?? "newest");
    const [openMore, setOpenMore] = useState(false);
    const [showSuggest, setShowSuggest] = useState(false);

    const { data: allProps } = useQuery({ queryKey: ["all-for-suggest"], queryFn: getAllProperties });
    const suggestions = useMemo(() => {
        const set = new Set<string>();
        (allProps ?? []).forEach((p) => {
            if (p.address.city) set.add(p.address.city);
            if (p.address.area) set.add(p.address.area);
        });
        return Array.from(set).sort((a, b) => a.localeCompare(b));
    }, [allProps]);

    const filteredSuggest = useMemo(() => {
        const q = city.trim().toLowerCase();
        if (!q) return suggestions.slice(0, 7);
        return suggestions.filter((s) => s.toLowerCase().includes(q)).slice(0, 7);
    }, [city, suggestions]);

    const suggestRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function onDoc(e: MouseEvent) {
            if (!suggestRef.current) return;
            if (!suggestRef.current.contains(e.target as Node)) setShowSuggest(false);
        }

        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    function apply(e?: React.FormEvent) {
        e?.preventDefault();
        onChange({ city, minPrice, maxPrice, beds, baths, type, sort });
    }

    function clearAll() {
        setCity("");
        setMin(undefined);
        setMax(undefined);
        setBeds(undefined);
        setBaths(undefined);
        setType("any");
        setSort("newest");
        onChange({ city: "", type: "any", sort: "newest" });
    }

    const chips = useMemo(() => {
        const c: Array<{ label: string; onRemove: () => void }> = [];
        if (city) c.push({ label: city, onRemove: () => setCity("") });
        if (minPrice != null || maxPrice != null) {
            c.push({
                label: `${minPrice != null ? `$${minPrice.toLocaleString()}` : "Any"} – ${maxPrice != null ? `$${maxPrice.toLocaleString()}` : "Any"}`,
                onRemove: () => {
                    setMin(undefined);
                    setMax(undefined);
                },
            });
        }
        if (beds != null) c.push({ label: `${beds}+ beds`, onRemove: () => setBeds(undefined) });
        if (baths != null) c.push({ label: `${baths}+ baths`, onRemove: () => setBaths(undefined) });
        if (type && type !== "any") c.push({
            label: type.charAt(0).toUpperCase() + type.slice(1),
            onRemove: () => setType("any")
        });
        if (sort && sort !== "newest") c.push({
            label: sort === "price_asc" ? "Price ↑" : "Price ↓",
            onRemove: () => setSort("newest")
        });
        return c;
    }, [city, minPrice, maxPrice, beds, baths, type, sort]);

    return (
        <div
            className="bg-gradient-to-b from-white/90 to-slate-50/60 border-b border-slate-200 shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.02)]">
            <form onSubmit={apply} className="mx-auto w-full max-w-[1200px] px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                    <div className="hidden sm:flex items-center gap-2 text-slate-500 mr-1">
                        <IconSliders className="h-4 w-4"/>
                        <span className="text-sm">Filters</span>
                    </div>

                    <div className="relative flex-1 min-w-[180px]" ref={suggestRef}>
                        <div className="relative">
                            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"/>
                            <input
                                className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200/70 bg-white/80 hover:bg-white focus:bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
                                placeholder="City or Area"
                                value={city}
                                onChange={(e) => {
                                    setCity(e.target.value);
                                    setShowSuggest(true);
                                }}
                                onFocus={() => setShowSuggest(true)}
                            />
                        </div>
                        {showSuggest && filteredSuggest.length > 0 && (
                            <div
                                className="absolute z-10 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
                                {filteredSuggest.map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => {
                                            setCity(s);
                                            setShowSuggest(false);
                                        }}
                                        className="w-full text-left px-3 py-2 hover:bg-slate-50 text-sm"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <input
                        type="number"
                        className="w-[120px] h-10 rounded-xl border border-slate-200/70 bg-white/80 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
                        placeholder="Min"
                        value={minPrice ?? ""}
                        onChange={(e) => setMin(e.target.value ? Number(e.target.value) : undefined)}
                    />
                    <span className="text-slate-400">–</span>
                    <input
                        type="number"
                        className="w-[120px] h-10 rounded-xl border border-slate-200/70 bg-white/80 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
                        placeholder="Max"
                        value={maxPrice ?? ""}
                        onChange={(e) => setMax(e.target.value ? Number(e.target.value) : undefined)}
                    />

                    <select
                        className="w-[140px] h-10 rounded-xl border border-slate-200/70 bg-white/80 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
                        value={sort ?? "newest"}
                        onChange={(e) => setSort(e.target.value as any)}
                    >
                        <option value="newest">Newest</option>
                        <option value="price_asc">Price ↑</option>
                        <option value="price_desc">Price ↓</option>
                    </select>

                    <button type="submit"
                            className="h-10 px-4 rounded-xl bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-500">
                        Apply
                    </button>
                    <button type="button" onClick={clearAll}
                            className="h-10 px-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-100/80">
                        Clear
                    </button>

                    <button
                        type="button"
                        onClick={() => setOpenMore((v) => !v)}
                        className="h-10 px-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-100/80 flex items-center gap-1 ml-auto"
                        aria-expanded={openMore}
                    >
                        More <IconChevronDown className={`h-4 w-4 transition ${openMore ? "rotate-180" : ""}`}/>
                    </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-slate-500 mr-1">Type:</span>
                    <PillBtn active={type === "any"} onClick={() => setType("any")} ariaLabel="Any type">Any</PillBtn>
                    <PillBtn active={type === "apartment"} onClick={() => setType("apartment")} ariaLabel="Apartment">
                        <IconB2 className="inline -mt-1 mr-1 h-4 w-4"/> Apartment
                    </PillBtn>
                    <PillBtn active={type === "house"} onClick={() => setType("house")} ariaLabel="House">
                        <IconHome className="inline -mt-1 mr-1 h-4 w-4"/> House
                    </PillBtn>
                    <PillBtn active={type === "villa"} onClick={() => setType("villa")} ariaLabel="Villa">
                        <IconBuilding className="inline -mt-1 mr-1 h-4 w-4"/> Villa
                    </PillBtn>
                    <PillBtn active={type === "studio"} onClick={() => setType("studio")} ariaLabel="Studio">
                        <IconWarehouse className="inline -mt-1 mr-1 h-4 w-4"/> Studio
                    </PillBtn>
                </div>

                {openMore && (
                    <div
                        className="mt-3 rounded-2xl border border-slate-200 bg-white p-3 md:p-4 flex flex-wrap items-center gap-4 shadow-sm">
                        <Stepper label="Beds" value={beds} setValue={setBeds} min={0} max={10}/>
                        <Stepper label="Baths" value={baths} setValue={setBaths} min={0} max={10}/>
                        <div className="text-xs text-slate-500">Tip: press <kbd
                            className="px-1 py-0.5 rounded border">Enter</kbd> to apply
                        </div>
                    </div>
                )}

                {chips.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {chips.map((c, i) => (
                            <span key={i}
                                  className="inline-flex items-center gap-2 px-3 h-8 rounded-full bg-indigo-50 text-indigo-700 text-sm border border-indigo-100">
                {c.label}
                                <button
                                    type="button"
                                    onClick={c.onRemove}
                                    className="h-5 w-5 grid place-items-center rounded-full hover:bg-indigo-100"
                                    aria-label={`Remove ${c.label}`}
                                >
                  <IconX width={14} height={14}/>
                </button>
              </span>
                        ))}
                    </div>
                )}
            </form>
        </div>
    );
}
