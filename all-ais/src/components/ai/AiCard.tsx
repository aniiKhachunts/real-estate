// src/components/ai/AiCard.tsx
import React from "react";
import type { AiTool } from "../../data/aiTools";

interface AiCardProps {
    tool: AiTool;
}

const AiCard: React.FC<AiCardProps> = ({ tool }) => {
    return (
        <article className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-neutral-900/60 p-4 transition hover:-translate-y-1 hover:border-fuchsia-400 hover:bg-neutral-900 hover:shadow-[0_0_40px_rgba(236,72,153,0.35)]">
            {/* Category + pricing */}
            <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.16em] text-neutral-400">
                <span>{tool.category}</span>
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px]">
          {tool.pricing}
        </span>
            </div>

            {/* Title + description */}
            <div className="mt-3 space-y-1.5">
                <h3 className="text-sm font-semibold text-white group-hover:text-fuchsia-200">
                    {tool.name}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-3">
                    {tool.shortDescription}
                </p>
            </div>

            {/* Tags + link */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                    {tool.tags.slice(0, 4).map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-neutral-800/80 px-2 py-0.5 text-[10px] text-neutral-300"
                        >
              #{tag}
            </span>
                    ))}
                </div>
                <a
                    href={tool.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-medium text-fuchsia-300 underline-offset-2 hover:underline"
                >
                    Перейти →
                </a>
            </div>
        </article>
    );
};

export default AiCard;
