// src/components/ai/AiFilters.tsx
import React from "react";
import type { AiCategory, PricingModel } from "../../data/aiTools";

export interface AiFilterState {
    search: string;
    category: AiCategory | "all";
    pricing: PricingModel | "all";
    featuredOnly: boolean;
}

interface AiFiltersProps {
    value: AiFilterState;
    onChange: (next: AiFilterState) => void;
}

const categoryOptions: { label: string; value: AiFilterState["category"] }[] = [
    { label: "Все", value: "all" },
    { label: "Контент", value: "content" },
    { label: "Маркетинг", value: "marketing" },
    { label: "Разработка", value: "developer" },
    { label: "Дизайн", value: "design" },
    { label: "Видео", value: "video" },
    { label: "Аудио", value: "audio" },
    { label: "Автоматизация", value: "automation" },
    { label: "Другое", value: "other" },
];

const pricingOptions: { label: string; value: AiFilterState["pricing"] }[] = [
    { label: "Любой", value: "all" },
    { label: "Free", value: "free" },
    { label: "Freemium", value: "freemium" },
    { label: "Paid", value: "paid" },
    { label: "Enterprise", value: "enterprise" },
];

const AiFilters: React.FC<AiFiltersProps> = ({ value, onChange }) => {
    const set = <K extends keyof AiFilterState>(key: K, val: AiFilterState[K]) =>
        onChange({ ...value, [key]: val });

    return (
        <div className="space-y-4 rounded-3xl border border-white/10 bg-neutral-900/60 p-4 backdrop-blur">
            {/* Top row: category tabs (similar to themedia “Все / AI-решения / SMM …”) */}
            <div className="flex flex-wrap gap-2">
                {categoryOptions.map((cat) => {
                    const active = value.category === cat.value;
                    return (
                        <button
                            key={cat.value}
                            type="button"
                            onClick={() => set("category", cat.value)}
                            className={[
                                "rounded-full border px-3 py-1 text-xs font-medium transition",
                                active
                                    ? "border-fuchsia-400 bg-fuchsia-500/10 text-fuchsia-200"
                                    : "border-white/10 bg-neutral-900/60 text-neutral-300 hover:border-fuchsia-400/70 hover:text-white",
                            ].join(" ")}
                        >
                            {cat.label}
                        </button>
                    );
                })}
            </div>

            {/* Bottom row: search + pricing + featured */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Search */}
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Поиск по названию, тегам, описанию…"
                        value={value.search}
                        onChange={(e) => set("search", e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-neutral-950/60 px-3 py-2 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-fuchsia-400"
                    />
                </div>

                {/* Pricing + featured */}
                <div className="flex flex-wrap items-center gap-3">
                    <select
                        className="min-w-[140px] rounded-2xl border border-white/10 bg-neutral-950/60 px-3 py-2 text-xs text-neutral-200 outline-none focus:border-fuchsia-400"
                        value={value.pricing}
                        onChange={(e) =>
                            set("pricing", e.target.value as AiFilterState["pricing"])
                        }
                    >
                        {pricingOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                Цены: {option.label}
                            </option>
                        ))}
                    </select>

                    <label className="flex cursor-pointer items-center gap-2 text-xs text-neutral-300">
                        <input
                            type="checkbox"
                            checked={value.featuredOnly}
                            onChange={(e) => set("featuredOnly", e.target.checked)}
                            className="h-4 w-4 rounded border border-white/20 bg-neutral-950/80 text-fuchsia-500"
                        />
                        Показывать только избранные
                    </label>
                </div>
            </div>
        </div>
    );
};

export default AiFilters;
