import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeaturedGrid from "../components/sections/FeaturedGrid";
import PopularAreas from "../components/sections/PopularAreas";
import HowItWorks from "../components/sections/HowItWorks";
import TestimonialsCta from "../components/sections/TestimonialsCta";
import PageFooter from "../components/sections/PageFooter";

const HERO_IMG =
    "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?q=80&w=1800&auto=format&fit=crop";

type TypeOpt = "any" | "apartment" | "house" | "villa" | "studio";

export default function Home() {
    const nav = useNavigate();

    // ----- listings filter -----
    const [city, setCity] = useState("");
    const [minPrice, setMin] = useState<number | undefined>();
    const [maxPrice, setMax] = useState<number | undefined>();
    const [type, setType] = useState<TypeOpt>("any");

    function submit(e: React.FormEvent) {
        e.preventDefault();
        const qs = new URLSearchParams();
        if (city) qs.set("city", city);
        if (minPrice != null) qs.set("minPrice", String(minPrice));
        if (maxPrice != null) qs.set("maxPrice", String(maxPrice));
        if (type !== "any") qs.set("type", type);
        nav(`/listings?${qs.toString()}`);
    }

    // ----- contact form -----
    const [cName, setCName] = useState("");
    const [cEmail, setCEmail] = useState("");
    const [cPhone, setCPhone] = useState("");
    const [cMsg, setCMsg] = useState("");
    const [agree, setAgree] = useState(false);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    function validate() {
        const e: Record<string, string> = {};
        if (!cName.trim()) e.name = "Please enter your name.";
        if (!cEmail.trim()) e.email = "Please enter your email.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cEmail)) e.email = "Enter a valid email.";
        if (!cMsg.trim()) e.msg = "Tell us briefly what you’re looking for.";
        if (!agree) e.agree = "You must agree to be contacted.";
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    async function onContactSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        setSending(true);
        try {
            // TODO: send to your API
            await new Promise((r) => setTimeout(r, 900));
            setSent(true);
            setCName("");
            setCEmail("");
            setCPhone("");
            setCMsg("");
            setAgree(false);
            setErrors({});
        } finally {
            setSending(false);
        }
    }

    function ContactCard() {
        return (
            <div
                className="w-[min(340px,90vw)] rounded-2xl bg-white/75 backdrop-blur-md ring-1 ring-white/30 shadow-xl p-4 md:p-5 transition hover:bg-white/85"
                role="region"
                aria-labelledby="contactTitle"
            >
                <h2 id="contactTitle" className="text-slate-900 text-base sm:text-lg font-semibold">
                    Tell us what you need
                </h2>
                <p className="text-slate-600 text-xs mt-1">
                    Share a few details — we’ll match you with the best options.
                </p>

                {sent && (
                    <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 px-3 py-2 text-xs">
                        We received your request. A specialist will contact you shortly.
                    </div>
                )}

                <form onSubmit={onContactSubmit} className="mt-3 grid grid-cols-1 gap-2.5">
                    <div>
                        <label className="block text-xs font-medium text-slate-700" htmlFor="cName">
                            Name
                        </label>
                        <input
                            id="cName"
                            name="name"
                            autoComplete="name"
                            className={`mt-1 h-11 w-full rounded-lg border px-3 text-sm outline-none transition
                ${errors.name ? "border-rose-400" : "border-slate-200 focus:border-slate-400"}`}
                            placeholder="Jane Doe"
                            value={cName}
                            onChange={(e) => setCName(e.target.value)}
                        />
                        {errors.name && <p className="mt-1 text-[11px] text-rose-500">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-700" htmlFor="cEmail">
                            Email
                        </label>
                        <input
                            id="cEmail"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className={`mt-1 h-11 w-full rounded-lg border px-3 text-sm outline-none transition
                ${errors.email ? "border-rose-400" : "border-slate-200 focus:border-slate-400"}`}
                            placeholder="jane@example.com"
                            value={cEmail}
                            onChange={(e) => setCEmail(e.target.value)}
                        />
                        {errors.email && <p className="mt-1 text-[11px] text-rose-500">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-700" htmlFor="cPhone">
                            Phone (optional)
                        </label>
                        <input
                            id="cPhone"
                            name="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            className="mt-1 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-slate-400"
                            placeholder="+1 555 123 4567"
                            value={cPhone}
                            onChange={(e) => setCPhone(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-700" htmlFor="cMsg">
                            What are you looking for?
                        </label>
                        <textarea
                            id="cMsg"
                            name="message"
                            className={`mt-1 min-h-[76px] w-full rounded-lg border px-3 py-2 text-sm outline-none transition
                ${errors.msg ? "border-rose-400" : "border-slate-200 focus:border-slate-400"}`}
                            placeholder="City, budget, bedrooms, timeline…"
                            value={cMsg}
                            onChange={(e) => setCMsg(e.target.value)}
                        />
                        {errors.msg && <p className="mt-1 text-[11px] text-rose-500">{errors.msg}</p>}
                    </div>

                    <label className="mt-0.5 flex items-start gap-2 text-xs text-slate-700">
                        <input
                            type="checkbox"
                            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                        />
                        <span>
              I agree to be contacted and accept the{" "}
                            <a className="underline" href="#" aria-label="Read our privacy policy">
                privacy policy
              </a>.
            </span>
                    </label>
                    {errors.agree && <p className="text-[11px] text-rose-500 -mt-1">{errors.agree}</p>}

                    <button
                        disabled={sending}
                        className="mt-1.5 h-11 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-500 disabled:opacity-60"
                    >
                        {sending ? "Sending…" : "Request help"}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="relative">
            <section className="relative min-h-[88vh] md:min-h-[92vh]">
                {/* Backdrop */}
                <div className="absolute inset-0">
                    <img
                        src={HERO_IMG}
                        alt="Modern house"
                        className="h-full w-full object-cover"
                        loading="eager"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/40" />
                </div>

                {/* Content */}
                <div className="relative">
                    {/* Space for transparent header */}
                    <div className="h-16 sm:h-20 md:h-24 pt-[env(safe-area-inset-top)]" />

                    <div className="mx-auto w-full max-w-[1200px] px-4">
                        {/* Headline */}
                        <div className="max-w-3xl text-white">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.07] tracking-tight">
                                Find your perfect home
                            </h1>
                            <p className="mt-3 md:mt-4 text-base sm:text-lg text-white/90">
                                Browse verified listings with maps, beautiful photos, and powerful filters.
                            </p>
                        </div>

                        {/* MOBILE contact card */}
                        <div className="lg:hidden mt-6">
                            <ContactCard />
                        </div>

                        {/* MOBILE filter */}
                        <div className="lg:hidden mt-4">
                            <form
                                onSubmit={submit}
                                className="rounded-2xl bg-white/95 backdrop-blur p-3 sm:p-4 shadow-xl grid gap-2 sm:gap-3 grid-cols-1"
                                aria-label="Search listings"
                            >
                                <input
                                    className="h-12 px-4 rounded-lg border border-slate-200 text-slate-900"
                                    placeholder="City / Area"
                                    name="city"
                                    autoComplete="address-level2"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                    <input
                                        type="number"
                                        inputMode="numeric"
                                        className="h-12 px-4 rounded-lg border border-slate-200 text-slate-900"
                                        placeholder="Min price"
                                        name="minPrice"
                                        value={minPrice ?? ""}
                                        onChange={(e) => setMin(e.target.value ? Number(e.target.value) : undefined)}
                                    />
                                    <input
                                        type="number"
                                        inputMode="numeric"
                                        className="h-12 px-4 rounded-lg border border-slate-200 text-slate-900"
                                        placeholder="Max price"
                                        name="maxPrice"
                                        value={maxPrice ?? ""}
                                        onChange={(e) => setMax(e.target.value ? Number(e.target.value) : undefined)}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 sm:gap-3">
                                    <select
                                        className="h-12 px-4 rounded-lg border border-slate-200 text-slate-900"
                                        name="type"
                                        value={type}
                                        onChange={(e) => setType(e.target.value as TypeOpt)}
                                    >
                                        <option value="any">Any type</option>
                                        <option value="apartment">Apartment</option>
                                        <option value="house">House</option>
                                        <option value="villa">Villa</option>
                                        <option value="studio">Studio</option>
                                    </select>

                                    <button
                                        className="h-12 rounded-lg bg-brand-600 hover:bg-brand-500 text-black font-medium transition"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* DESKTOP contact card (floating right). Fluid top via clamp to prevent overlapping the filter */}
                    <div
                        className="hidden lg:block absolute right-6 xl:right-8 z-10"
                        style={{ top: "clamp(14vh, 20vh, 26vh)" }}
                    >
                        <ContactCard />
                    </div>
                </div>

                {/* DESKTOP floating filter (bottom) */}
                <div className="pointer-events-none absolute bottom-4 left-0 right-0 z-20 hidden lg:block pb-[env(safe-area-inset-bottom)]">
                    <div className="pointer-events-auto mx-auto w-full max-w-[1200px] px-4">
                        <form
                            onSubmit={submit}
                            className="bg-white/92 backdrop-blur-xl rounded-2xl shadow-2xl p-3 md:p-4
                         grid gap-2 md:gap-3 grid-cols-2 md:grid-cols-12"
                            aria-label="Search listings"
                        >
                            <input
                                className="col-span-2 md:col-span-4 h-12 px-4 rounded-lg border border-slate-200 text-slate-900"
                                placeholder="City / Area"
                                name="city"
                                autoComplete="address-level2"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <input
                                type="number"
                                inputMode="numeric"
                                className="col-span-1 md:col-span-2 h-12 px-4 rounded-lg border border-slate-200 text-slate-900"
                                placeholder="Min price"
                                name="minPrice"
                                value={minPrice ?? ""}
                                onChange={(e) => setMin(e.target.value ? Number(e.target.value) : undefined)}
                            />
                            <input
                                type="number"
                                inputMode="numeric"
                                className="col-span-1 md:col-span-2 h-12 px-4 rounded-lg border border-slate-200 text-slate-900"
                                placeholder="Max price"
                                name="maxPrice"
                                value={maxPrice ?? ""}
                                onChange={(e) => setMax(e.target.value ? Number(e.target.value) : undefined)}
                            />
                            <select
                                className="col-span-1 md:col-span-2 h-12 px-4 rounded-lg border border-slate-200 text-slate-900"
                                name="type"
                                value={type}
                                onChange={(e) => setType(e.target.value as TypeOpt)}
                            >
                                <option value="any">Any type</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="villa">Villa</option>
                                <option value="studio">Studio</option>
                            </select>

                            <button className="col-span-1 md:col-span-2 h-12 rounded-lg bg-brand-600 hover:bg-brand-500 text-black font-medium transition">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* spacer below hero */}
            <section className="bg-white">
                <div className="mx-auto w-full max-w-[1200px] px-4 py-6" />
            </section>

            {/* rest of homepage */}
            <FeaturedGrid />
            <PopularAreas />
            <HowItWorks />
            <TestimonialsCta />
            <PageFooter />
        </div>
    );
}
