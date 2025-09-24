import { useNavigate } from "react-router-dom";

const AREAS = [
    {
        label: "Kentron",
        img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop"
    },
    {
        label: "Arabkir",
        img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop"
    },
    {
        label: "Davtashen",
        img: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1200&auto=format&fit=crop"
    },
    {
        label: "Ajapnyak",
        img: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1200&auto=format&fit=crop"
    },
];

export default function PopularAreas() {
    const nav = useNavigate();
    const go = (city: string) => nav(`/listings?${new URLSearchParams({ city })}`);

    return (
        <section className="bg-slate-50">
            <div className="mx-auto w-full max-w-[1200px] px-4 py-16">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Popular areas</h2>

                <div className="mt-8 grid gap-6 grid-cols-2 md:grid-cols-4">
                    {AREAS.map((a) => (
                        <button
                            key={a.label}
                            onClick={() => go(a.label)}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden text-left"
                            aria-label={`Search in ${a.label}`}
                        >
                            <img src={a.img} alt={a.label}
                                 className="w-full h-full object-cover transition-transform group-hover:scale-105"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/10"/>
                            <div className="absolute bottom-3 left-3 text-white font-medium drop-shadow">{a.label}</div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
