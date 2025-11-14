// src/components/layout/Header.tsx
import React from "react";

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-30 border-b border-white/5 bg-neutral-950/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-0">
                {/* Logo / Brand */}
                <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-emerald-400" />
                    <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
              The AI Media
            </span>
                        <span className="text-xs text-neutral-500">
              Curated directory of AI tools
            </span>
                    </div>
                </div>

                {/* Nav */}
                <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-300 md:flex">
                    <a href="#tools" className="transition hover:text-white">
                        AI Tools
                    </a>
                    <a href="#cases" className="transition hover:text-white">
                        Use cases
                    </a>
                    <a href="#reviews" className="transition hover:text-white">
                        Reviews
                    </a>
                    <a href="#contact" className="transition hover:text-white">
                        Contact
                    </a>
                </nav>

                {/* CTA */}
                <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-50 transition hover:bg-white/10">
                    Submit your AI tool
                </button>
            </div>
        </header>
    );
};

export default Header;
