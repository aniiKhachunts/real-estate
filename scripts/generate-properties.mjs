import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../public/data");
const OUT_PROPS = resolve(OUT_DIR, "properties.json");
const OUT_POPULAR = resolve(OUT_DIR, "popular-areas.json");

/* ------------------ deterministic helpers ------------------ */
function mulberry32(seed) {
    return function () {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
const rand = mulberry32(20251001);
const rnd = (min, max) => Math.floor(rand() * (max - min + 1)) + min;
const choice = (arr) => arr[Math.floor(rand() * arr.length)];
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$|/g, "");
const hash = (s) => {
    let h = 2166136261 >>> 0; // FNV-1a
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
};

/* ------------------ domain data ------------------ */
const CITIES = [
    { city: "New York", areas: ["Manhattan", "Brooklyn", "Queens", "Upper East Side", "SoHo"], currency: "USD", base: 850_000 },
    { city: "San Francisco", areas: ["SoMa", "Mission", "Nob Hill", "Noe Valley"], currency: "USD", base: 1_050_000 },
    { city: "Los Angeles", areas: ["Hollywood", "Santa Monica", "Beverly Hills", "Venice"], currency: "USD", base: 950_000 },
    { city: "Miami", areas: ["Brickell", "Wynwood", "South Beach"], currency: "USD", base: 700_000 },
    { city: "London", areas: ["Camden", "Kensington", "Islington", "Shoreditch"], currency: "GBP", base: 800_000 },
    { city: "Paris", areas: ["Le Marais", "Latin Quarter", "Montmartre"], currency: "EUR", base: 750_000 },
    { city: "Berlin", areas: ["Mitte", "Prenzlauer Berg", "Kreuzberg"], currency: "EUR", base: 600_000 },
    { city: "Madrid", areas: ["Salamanca", "Chamberí", "Retiro"], currency: "EUR", base: 550_000 },
    { city: "Rome", areas: ["Trastevere", "Prati", "Monti"], currency: "EUR", base: 520_000 },
    { city: "Amsterdam", areas: ["Jordaan", "De Pijp", "Oud-West"], currency: "EUR", base: 680_000 },
    { city: "Dubai", areas: ["Dubai Marina", "Downtown", "Jumeirah"], currency: "AED", base: 1_800_000 },
    { city: "Istanbul", areas: ["Beyoğlu", "Beşiktaş", "Kadıköy"], currency: "TRY", base: 8_500_000 },
    { city: "Singapore", areas: ["Orchard", "River Valley", "Tanjong Pagar"], currency: "SGD", base: 1_200_000 },
    { city: "Sydney", areas: ["Surry Hills", "Bondi", "Newtown"], currency: "AUD", base: 1_000_000 },
    { city: "Toronto", areas: ["Downtown", "Yorkville", "Liberty Village"], currency: "CAD", base: 900_000 },
    { city: "Tokyo", areas: ["Shibuya", "Minato", "Meguro"], currency: "JPY", base: 120_000_000 },
];

const TYPES = ["apartment", "house", "villa", "studio"];

/* A pool of unique Unsplash photo IDs we already used across your project.
   We’ll *cycle* through these deterministically so covers don’t clump. */
const PHOTO_IDS = [
    "1521783988139-893cebf1fef2",
    "1505693314120-0d443867891c",
    "1523217582562-09d0def993a6",
    "1501045661006-fcebe0257c3f",
    "1501183638710-841dd1904471",
    "1494526585095-c41746248156",
    "1502003148287-a82ef80a6abc",
    "1544457070-55de6b3ac5cb",
    "1554995207-c18c203602cb",
    "1512917774080-9991f1c4c750",
    "1467987506553-8f3916508521",
    "1522708323590-d24dbb6b0267",
    "1484154218962-a197022b5858",
    "1467987506553-8f3916508521", // keep but we’ll skip dups below
].filter((id, i, a) => a.indexOf(id) === i); // ensure unique IDs in the pool

const U = (id, w = 1600, h = 1000) =>
    `https://images.unsplash.com/photo-${id}?q=80&w=${w}&h=${h}&fit=crop&auto=format`;

/* Create a per-city rotating pointer into PHOTO_IDS so
   – every property’s *cover* within a city differs until we’ve cycled the pool
   – galleries never repeat the same image inside a single listing */
const cityPtr = new Map(
    CITIES.map((c, i) => {
        const start = (hash(c.city) + i * 7) % PHOTO_IDS.length;
        return [c.city, start];
    })
);
const STEP = 5; // co-prime with PHOTO_IDS.length (14) → better spread

function nextCoverFor(city) {
    const cur = cityPtr.get(city);
    cityPtr.set(city, (cur + STEP) % PHOTO_IDS.length);
    return cur;
}

/* ------------------ property factory ------------------ */
function makeProperty(i) {
    const c = choice(CITIES);
    const area = choice(c.areas);
    const type = choice(TYPES);

    const areaM2 = rnd(35, type === "villa" ? 420 : 200);
    const beds = Math.max(1, Math.min(6, Math.round(areaM2 / (type === "studio" ? 60 : 40))));
    const baths = Math.max(1, Math.min(4, Math.round(beds / 1.5)));
    const typeFactor = { apartment: 1.0, house: 1.15, villa: 1.5, studio: 0.8 }[type];
    const price = Math.round(c.base * typeFactor + areaM2 * rnd(2200, 4500) * (type === "villa" ? 1.2 : 1) * 0.0005);

    // cover + 3 distinct gallery images (no repeats inside a listing)
    const baseIdx = nextCoverFor(c.city);
    const imgs = [0, 1, 2, 3].map((k) => U(PHOTO_IDS[(baseIdx + k) % PHOTO_IDS.length]));

    return {
        id: `${slug(c.city)}-${slug(area)}-${type}-${i + 1}`,
        title: `${type[0].toUpperCase() + type.slice(1)} in ${area}, ${c.city}`,
        price,
        currency: c.currency,
        type,
        beds,
        baths,
        areaM2,
        address: { city: c.city, area },
        images: imgs,
        description: `Modern ${type} located in ${area}, ${c.city}. Bright, airy layout with ${beds} bedroom${beds > 1 ? "s" : ""}, ${baths} bathroom${baths > 1 ? "s" : ""}, and ${areaM2} m² of living space. Close to shops, transit, and parks.`,
    };
}

/* ------------------ build popular list (stable + unique thumbs) ------------------ */
function buildPopular(items, take = 8) {
    const byCity = new Map();
    for (const p of items) {
        const key = p.address.city;
        const first = !byCity.has(key);
        const entry = byCity.get(key) || { city: key, listings: 0, img: "" };
        entry.listings += 1;
        // we’ll set images after we know which cities we keep
        if (first) byCity.set(key, entry);
    }

    const top = [...byCity.values()]
        .sort((a, b) => b.listings - a.listings || a.city.localeCompare(b.city))
        .slice(0, take);

    // assign *unique* thumbnails across popular
    const used = new Set();
    for (const entry of top) {
        // deterministic start per city, then walk until we find a free photo
        let idx = (hash("popular:" + entry.city) * 7) % PHOTO_IDS.length;
        for (let tries = 0; tries < PHOTO_IDS.length; tries++) {
            const id = PHOTO_IDS[idx];
            if (!used.has(id)) {
                used.add(id);
                entry.img = U(id);
                break;
            }
            idx = (idx + 1) % PHOTO_IDS.length;
        }
    }
    return top;
}

/* ------------------ main ------------------ */
async function main() {
    const items = Array.from({ length: 100 }, (_, i) => makeProperty(i));
    const popular = buildPopular(items, 8);

    await mkdir(OUT_DIR, { recursive: true });
    await writeFile(OUT_PROPS, JSON.stringify(items, null, 2), "utf-8");
    await writeFile(OUT_POPULAR, JSON.stringify(popular, null, 2), "utf-8");

    console.log(`✓ Wrote ${items.length} properties → ${OUT_PROPS}`);
    console.log(`✓ Wrote ${popular.length} popular areas → ${OUT_POPULAR}`);
}
main().catch((e) => {
    console.error(e);
    process.exit(1);
});
