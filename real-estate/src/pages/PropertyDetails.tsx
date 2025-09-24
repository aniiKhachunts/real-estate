import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getById, getFiltered } from "../lib/api";
import Gallery from "../components/gallery/Gallery";
import InquiryCard from "../components/property/InquiryCard";
import Facts from "../components/property/Facts";
import PropertyCard from "../components/cards/PropertyCard";
import ScheduleTourModal from "../components/modals/ScheduleTourModal";
import MortgageCalculator from "../components/tools/MortgageCalculator";
import { useRecent } from "../app/recentStore";

export default function PropertyDetails() {
    const { id = "" } = useParams();

    const { data: p, isLoading, isError } = useQuery({
        queryKey: ["property", id],
        queryFn: () => getById(id),
    });

    const { data: similar } = useQuery({
        queryKey: ["similar", id, p?.type, p?.address?.city],
        queryFn: () => getFiltered({ type: p?.type as any, city: p?.address?.city }),
        enabled: !!p,
    });

    const pushRecent = useRecent((s) => s.push);
    useEffect(() => {
        if (p?.id) pushRecent(p.id);
    }, [p?.id, pushRecent]);

    const [openTour, setOpenTour] = useState(false);

    useEffect(() => {
        if (p) document.title = `${p.title} • ${p.address.city}${p.address.area ? ", " + p.address.area : ""}`;
    }, [p]);

    if (isLoading) {
        return <div className="mx-auto max-w-[1200px] px-4 py-10">Loading…</div>;
    }
    if (isError || !p) {
        return (
            <div className="mx-auto max-w-[1200px] px-4 py-10">
                <div className="text-xl font-semibold">We couldn’t load this property.</div>
                <div className="text-slate-600 mt-1">Please go back to listings and try again.</div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50">
            <section className="mx-auto max-w-[1200px] px-4 py-6">
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Gallery images={p.images || []} alt={p.title}/>

                        <div>
                            <h1 className="text-3xl font-bold">{p.title}</h1>
                            <div className="text-slate-600">
                                {p.address.city}
                                {p.address.area ? `, ${p.address.area}` : ""}
                            </div>
                        </div>

                        <Facts beds={p.beds} baths={p.baths} areaM2={p.areaM2} type={p.type}/>

                        <div>
                            <h2 className="text-xl font-semibold mt-6 mb-2">Overview</h2>
                            <p className="text-slate-700 leading-relaxed">
                                {p.description || "No description provided."}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mt-6 mb-3">Location</h2>
                            <div className="rounded-2xl overflow-hidden border">
                                <iframe
                                    title="map"
                                    className="w-full h-72"
                                    loading="lazy"
                                    src="https://maps.google.com/maps?q=Yerevan&t=&z=12&ie=UTF8&iwloc=&output=embed"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <InquiryCard
                            price={p.price}
                            onSchedule={() => setOpenTour(true)}
                        />

                        <ScheduleTourModal
                            open={openTour}
                            onClose={() => setOpenTour(false)}
                            propertyId={p.id}
                            onSubmitLead={async (payload) => {
                                // TODO: send to API / email service
                                console.log("Lead:", payload);
                            }}
                        />

                        <div className="mt-4">
                            <MortgageCalculator price={p.price}/>
                        </div>
                    </div>
                </div>

                {similar && similar.filter((s) => s.id !== p.id).length > 0 && (
                    <div className="mt-12">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Similar listings</h2>
                        </div>
                        <div className="mt-4 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {similar
                                .filter((s) => s.id !== p.id)
                                .slice(0, 8)
                                .map((s) => (
                                    <PropertyCard key={s.id} p={s}/>
                                ))}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
