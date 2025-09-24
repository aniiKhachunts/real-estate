export default function HowItWorks() {
    return (
        <section className="bg-white">
            <div className="mx-auto w-full max-w-[1200px] px-4 py-10">
                <h2 className="text-2xl md:text-3xl font-bold tracking-normal leading-tight text-slate-900">
                    How it works
                </h2>

                <div className="mt-6 grid gap-5 md:gap-6 grid-cols-1 md:grid-cols-3">
                    {[
                        {
                            n: "1",
                            title: "Search",
                            body:
                                "Set your location, budget, and home type to see matches.",
                        },
                        {
                            n: "2",
                            title: "Visit",
                            body:
                                "Schedule tours or contact the agent right from the listing.",
                        },
                        {
                            n: "3",
                            title: "Move in",
                            body:
                                "Make an offer with confidence and finalize the deal.",
                        },
                    ].map((s) => (
                        <div
                            key={s.n}
                            className="
                rounded-2xl border bg-white shadow-sm
                p-5 md:p-6
                leading-normal tracking-normal
                text-slate-700
                break-words whitespace-normal
                overflow-visible
              "
                        >
                            <div className="text-sm font-semibold text-slate-500">{s.n}</div>
                            <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900">
                                {s.title}
                            </h3>
                            <p className="mt-2 text-sm md:text-[15px] text-slate-600">
                                {s.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
