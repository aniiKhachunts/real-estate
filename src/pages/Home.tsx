import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeaturedGrid from "../components/sections/FeaturedGrid";
import PopularAreas from "../components/sections/PopularAreas";
import HowItWorks from "../components/sections/HowItWorks";
import TestimonialsCta from "../components/sections/TestimonialsCta";
import PageFooter from "../components/sections/PageFooter";

const HERO_IMG =
    "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?q=80&w=1800&auto=format&fit=crop";

export default function Home() {
    const nav = useNavigate();
    const [city, setCity] = useState("");
    const [minPrice, setMin] = useState<number | undefined>();
    const [maxPrice, setMax] = useState<number | undefined>();
    const [type, setType] = useState<"any" | "apartment" | "house" | "villa" | "studio">("any");

    function submit(e: React.FormEvent) {
        e.preventDefault();
        const qs = new URLSearchParams();
        if (city) qs.set("city", city);
        if (minPrice != null) qs.set("minPrice", String(minPrice));
        if (maxPrice != null) qs.set("maxPrice", String(maxPrice));
        if (type !== "any") qs.set("type", type);
        nav(`/listings?${qs.toString()}`);
    }

    return (
        <div className="relative">
            <section className="relative min-h-[92vh]">
                <div className="absolute inset-0">
                    <img src={HERO_IMG} alt="Modern house" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/40" />
                </div>

                <div className="relative">
                    <div className="h-20 md:h-24" />
                    <div className="mx-auto w-full max-w-[1200px] px-4">
                        <div className="max-w-3xl text-white">
                            <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
                                Find your perfect home
                            </h1>
                            <p className="mt-4 text-lg text-white/90">
                                Browse verified listings with maps, beautiful photos, and powerful filters.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pointer-events-none absolute bottom-8 left-0 right-0">
                    <div className="pointer-events-auto mx-auto w-full max-w-[1200px] px-4">
                        <form
                            onSubmit={submit}
                            className="bg-white/92 backdrop-blur-xl rounded-2xl shadow-2xl p-3 md:p-4
                         grid gap-2 md:gap-3 grid-cols-2 md:grid-cols-12"
                        >
                            <input
                                className="col-span-2 md:col-span-4 h-12 px-4 rounded-lg border border-slate-200 text-slate-900"
                                placeholder="City / Area"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <input
                                type="number"
                                className="col-span-1 md:col-span-2 h-12 px-4 rounded-lg border border-slate-200 text-slate-900"
                                placeholder="Min price"
                                value={minPrice ?? ""}
                                onChange={(e) => setMin(e.target.value ? Number(e.target.value) : undefined)}
                            />
                            <input
                                type="number"
                                className="col-span-1 md:col-span-2 h-12 px-4 rounded-lg border border-slate-200 text-slate-900"
                                placeholder="Max price"
                                value={maxPrice ?? ""}
                                onChange={(e) => setMax(e.target.value ? Number(e.target.value) : undefined)}
                            />
                            <select
                                className="col-span-1 md:col-span-2 h-12 px-4 rounded-lg border border-slate-200 text-slate-900"
                                value={type}
                                onChange={(e) => setType(e.target.value as any)}
                            >
                                <option value="any">Any type</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="villa">Villa</option>
                                <option value="studio">Studio</option>
                            </select>

                            <button className="col-span-1 md:col-span-2 h-12 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-medium transition">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="mx-auto w-full max-w-[1200px] px-4 py-6" />
            </section>

            <FeaturedGrid />
            <PopularAreas />
            <HowItWorks />
            <TestimonialsCta />
            <PageFooter />
        </div>
    );
}
