// src/components/ai/AiGrid.tsx
import React, { useMemo, useState } from "react";
import { aiToolsMock, type AiTool } from "../../data/aiTools";
import AiFilters, { type AiFilterState } from "./AiFilters";
import AiCard from "./AiCard";

const defaultFilter: AiFilterState = {
    search: "",
    category: "all",
    pricing: "all",
    featuredOnly: false,
};

const filterTools = (tools: AiTool[], filter: AiFilterState): AiTool[] => {
    return tools.filter((tool) => {
        if (filter.category !== "all" && tool.category !== filter.category) {
            return false;
        }
        if (filter.pricing !== "all" && tool.pricing !== filter.pricing) {
            return false;
        }
        if (filter.featuredOnly && !tool.featured) {
            return false;
        }
        if (filter.search.trim()) {
            const q = filter.search.toLowerCase();
            const haystack =
                (tool.name + tool.shortDescription + tool.tags.join(" ")).toLowerCase();
            if (!haystack.includes(q)) return false;
        }
        return true;
    });
};

const AiGrid: React.FC = () => {
    const [filter, setFilter] = useState<AiFilterState>(defaultFilter);

    const filtered = useMemo(
        () => filterTools(aiToolsMock, filter),
        [filter]
    );

    return (
        <section
            id="tools"
            className="bg-neutral-950 py-12 sm:py-16 border-t border-white/5"
        >
            <div className="mx-auto max-w-6xl px-4 lg:px-0">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-2">
                        <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-400">
                            AI-каталог
                        </h2>
                        <h3 className="text-xl font-semibold text-white sm:text-2xl">
                            Применяем авторские методики выбора AI-инструментов
                        </h3>
                        <p className="text-sm text-neutral-400">
                            Отфильтруй по задачам, бюджету и типу — и получи shortlist AI-сервисов,
                            с которых стоит начать.
                        </p>
                    </div>

                    <div className="text-xs text-neutral-400">
                        Найдено{" "}
                        <span className="font-semibold text-fuchsia-300">
              {filtered.length}
            </span>{" "}
                        инструментов
                    </div>
                </div>

                <div className="mt-6">
                    <AiFilters value={filter} onChange={setFilter} />
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((tool) => (
                        <AiCard key={tool.id} tool={tool} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AiGrid;
