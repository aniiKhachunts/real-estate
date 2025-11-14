// src/components/home/StatsSection.tsx
import React from "react";

const stats = [
    {
        label: "AI-инструментов изучено",
        value: "800+",
        sub: "которые мы добавим в каталог",
    },
    {
        label: "Категорий",
        value: "25+",
        sub: "маркетинг, контент, dev, аналитика и др.",
    },
    {
        label: "кейсов внедрения",
        value: "100+",
        sub: "от маркетинговых агентств и команд",
    },
];

const StatsSection: React.FC = () => {
    return (
        <section className="border-y border-white/5 bg-neutral-950 py-12" id="stats">
            <div className="mx-auto max-w-6xl px-4 lg:px-0">
                <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-400">
                    Цифры говорят сами за себя
                </h2>
                <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                    Что такое система AI-инструментов?
                </h3>

                <div className="mt-8 grid gap-8 sm:grid-cols-3">
                    {stats.map((item) => (
                        <div key={item.label} className="space-y-2">
                            <div className="text-3xl font-semibold text-white">
                                {item.value}
                            </div>
                            <div className="text-sm text-neutral-300">{item.label}</div>
                            <div className="text-xs text-neutral-500">{item.sub}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
