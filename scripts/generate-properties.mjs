import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/data/properties.json");

// --- Cities & neighborhoods (no Armenia) ---
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

// Types & images
const TYPES = ["apartment", "house", "villa", "studio"];

/** random helpers **/
const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const choice = (arr) => arr[Math.floor(Math.random() * arr.length)];
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$|/g, "");

// Unsplash image URL builder (reliable generic images)
const img = (query, w = 1600, h = 1000) =>
    `https://images.unsplash.com/photo-${choice([
        "1501183638710-841dd1904471",
        "1505693314120-0d443867891c",
        "1523217582562-09d0def993a6",
        "1523217582562-09d0def993a6",
        "1521783988139-893cebf1fef2",
        "1502003148287-a82ef80a6abc",
        "1494526585095-c41746248156",
        "1501045661006-fcebe0257c3f",
        "1544457070-55de6b3ac5cb",
        "1554995207-c18c203602cb",
    ])}?q=80&w=${w}&h=${h}&fit=crop&auto=format`;

function makeProperty(i) {
    const c = choice(CITIES);
    const area = choice(c.areas);
    const type = choice(TYPES);

    // size & rooms
    const areaM2 = rnd(35, type === "villa" ? 420 : 200);
    const beds = Math.max(1, Math.min(6, Math.round(areaM2 / (type === "studio" ? 60 : 40))));
    const baths = Math.max(1, Math.min(4, Math.round(beds / 1.5)));

    // price around city base, scaled by type & size
    const typeFactor = { apartment: 1.0, house: 1.15, villa: 1.5, studio: 0.8 }[type];
    const price = Math.round((c.base * typeFactor) + areaM2 * rnd(2200, 4500) * (type === "villa" ? 1.2 : 1) * 0.0005);

    const title = `${type[0].toUpperCase() + type.slice(1)} in ${area}, ${c.city}`;
    const id = `${slug(c.city)}-${slug(area)}-${type}-${i + 1}`;

    return {
        id,
        title,
        price,
        currency: c.currency,                     // OPTIONAL: if your UI wants it later
        type,                                     // "apartment" | "house" | "villa" | "studio"
        beds,
        baths,
        areaM2,
        address: { city: c.city, area },
        images: [
            img(`${c.city} ${type} exterior`),
            img(`${c.city} ${type} interior`),
            img(`${c.city} living room`),
            img(`${c.city} kitchen`),
        ],
        description:
            `Modern ${type} located in ${area}, ${c.city}. Bright, airy layout with ${beds} bedroom${beds>1?"s":""}, ` +
            `${baths} bathroom${baths>1?"s":""}, and ${areaM2} m² of living space. Close to shops, transit, and parks.`,
    };
}

async function main() {
    const items = Array.from({ length: 100 }, (_, i) => makeProperty(i));

    // ensure directory exists
    await mkdir(dirname(OUT), { recursive: true });
    await writeFile(OUT, JSON.stringify(items, null, 2), "utf-8");
    console.log(`✓ Wrote ${items.length} properties → ${OUT}`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
