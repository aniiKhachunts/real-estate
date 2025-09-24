// src/lib/api.ts
import type { Property, PropertyType } from "./types";

/** bump to force refetch when you regenerate data */
const DATA_VERSION = import.meta.env.VITE_DATA_VERSION ?? "1";

let _all: Property[] | null = null;

function normalize(p: Property): Property { return p; }

/* ----------------- Fallback generator (never fails) ----------------- */
const CITIES = [
    { city: "New York", areas: ["Manhattan","Brooklyn","Queens","SoHo"], currency: "USD", base: 850_000 },
    { city: "San Francisco", areas: ["SoMa","Mission","Nob Hill","Noe Valley"], currency: "USD", base: 1_050_000 },
    { city: "Los Angeles", areas: ["Hollywood","Santa Monica","Venice"], currency: "USD", base: 950_000 },
    { city: "London", areas: ["Camden","Kensington","Islington","Shoreditch"], currency: "GBP", base: 800_000 },
    { city: "Paris", areas: ["Le Marais","Latin Quarter","Montmartre"], currency: "EUR", base: 750_000 },
    { city: "Berlin", areas: ["Mitte","Prenzlauer Berg","Kreuzberg"], currency: "EUR", base: 600_000 },
    { city: "Dubai", areas: ["Dubai Marina","Downtown","Jumeirah"], currency: "AED", base: 1_800_000 },
    { city: "Singapore", areas: ["Orchard","River Valley","Tanjong Pagar"], currency: "SGD", base: 1_200_000 },
    { city: "Sydney", areas: ["Surry Hills","Bondi","Newtown"], currency: "AUD", base: 1_000_000 },
    { city: "Tokyo", areas: ["Shibuya","Minato","Meguro"], currency: "JPY", base: 120_000_000 },
] as const;
const TYPES: PropertyType[] = ["apartment","house","villa","studio"];
const rnd = (a:number,b:number)=>Math.floor(Math.random()*(b-a+1))+a;
const pick = <T,>(arr:T[]) => arr[Math.floor(Math.random()*arr.length)];
const slug = (s:string)=>s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$|/g,"");
const img = (w=1600,h=1000)=>`https://images.unsplash.com/photo-${
    pick([
        "1501183638710-841dd1904471","1505693314120-0d443867891c","1523217582562-09d0def993a6",
        "1521783988139-893cebf1fef2","1502003148287-a82ef80a6abc","1494526585095-c41746248156",
        "1501045661006-fcebe0257c3f","1544457070-55de6b3ac5cb","1554995207-c18c203602cb",
    ])
}?q=80&w=${w}&h=${h}&fit=crop&auto=format`;

function genOne(i:number): Property {
    const c = pick([...CITIES]);
    const area = pick([...c.areas]);
    const type = pick(TYPES);
    const areaM2 = rnd(35, type === "villa" ? 420 : 220);
    const beds = Math.max(1, Math.min(6, Math.round(areaM2 / (type === "studio" ? 60 : 40))));
    const baths = Math.max(1, Math.min(4, Math.round(beds / 1.5)));
    const factor = { apartment:1.0, house:1.15, villa:1.5, studio:0.8 }[type];
    const price = Math.round(c.base * factor + areaM2 * rnd(2200, 4500) * (type==="villa"?1.2:1) * 0.0005);
    const id = `${slug(c.city)}-${slug(area)}-${type}-${i+1}`;
    return {
        id,
        title: `${type[0].toUpperCase()}${type.slice(1)} in ${area}, ${c.city}`,
        price,
        currency: c.currency,
        type,
        beds,
        baths,
        areaM2,
        address: { city: c.city, area },
        images: [img(), img(), img(), img()],
        description: `Modern ${type} in ${area}, ${c.city}. ${beds} bed${beds===1?"":"s"}, ${baths} bath${baths===1?"":"s"}, ${areaM2} m².`,
    };
}
const generateFallback = (n=100) => Array.from({length:n},(_,i)=>genOne(i));

/* ------------- Optional bundled JSON fallback (src/data/...) ---------- */
const BUNDLED: Record<string, Property[]> = import.meta.glob("../data/*.json", {
    eager: true, import: "default",
}) as any;

/* ------------------------ Loader (no throws) -------------------------- */
async function loadData(): Promise<Property[]> {
    // 1) Try public file (works if you later run your generator)
    // Keep it simple to avoid BASE_URL mistakes:
    const publicUrl = `/data/properties.json?v=${DATA_VERSION}`;
    try {
        const res = await fetch(publicUrl, { cache: import.meta.env.DEV ? "no-store" : "default" });
        if (res.ok) {
            const json = (await res.json()) as Property[];
            if (Array.isArray(json) && json.length) return json.map(normalize);
        }
    } catch {/* ignore and fall through */}

    // 2) Try bundled src/data/properties.json if you ever add one
    const key = Object.keys(BUNDLED).find(k => /properties\.json$/i.test(k));
    if (key) {
        console.warn("[api] Using bundled src/data/properties.json");
        const json = BUNDLED[key];
        if (Array.isArray(json) && json.length) return json.map(normalize);
    }

    // 3) Guaranteed fallback
    console.warn("[api] Falling back to in-memory dataset (no properties.json found).");
    return generateFallback(100);
}

export async function getAllProperties(): Promise<Property[]> {
    if (_all) return _all;
    _all = await loadData();
    return _all!;
}

export type Filters = {
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    beds?: number;
    baths?: number;
    type?: "any" | "apartment" | "house" | "villa" | "studio";
    sort?: "newest" | "price_asc" | "price_desc";
};

export async function getFiltered(filters: Filters): Promise<Property[]> {
    const all = await getAllProperties();
    const cityQ = (filters.city ?? "").trim().toLowerCase();
    const type = filters.type ?? "any";

    let list = all.filter((p) => {
        const city = p.address.city?.toLowerCase?.() ?? "";
        const area = p.address.area?.toLowerCase?.() ?? "";
        const inCity = !cityQ || city.includes(cityQ) || area.includes(cityQ);
        const inType = type === "any" || p.type === type;
        const inMin = filters.minPrice == null || p.price >= filters.minPrice!;
        const inMax = filters.maxPrice == null || p.price <= filters.maxPrice!;
        const inBeds = filters.beds == null || p.beds >= filters.beds!;
        const inBaths = filters.baths == null || p.baths >= filters.baths!;
        return inCity && inType && inMin && inMax && inBeds && inBaths;
    });

    switch (filters.sort) {
        case "price_asc":  list.sort((a,b)=>a.price-b.price); break;
        case "price_desc": list.sort((a,b)=>b.price-a.price); break;
        default:           list.sort((a,b)=> (String(b.id) > String(a.id) ? 1 : -1));
    }
    return list;
}

export async function getById(id: string): Promise<Property | null> {
    const all = await getAllProperties();
    return all.find(p => String(p.id) === String(id)) ?? null;
}

export function refreshProperties() { _all = null; }
