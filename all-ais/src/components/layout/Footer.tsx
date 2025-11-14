// src/components/layout/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="border-t border-white/5 bg-neutral-950 py-8" id="contact">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 text-sm text-neutral-400 lg:flex-row lg:items-center lg:justify-between lg:px-0">
                <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
                        AI Media
                    </div>
                    <p className="mt-2 max-w-sm text-xs text-neutral-500">
                        Кураторский каталог AI-инструментов для бизнеса, маркетинга,
                        разработчиков и создателей контента.
                    </p>
                </div>

                <div className="space-y-1 text-xs">
                    <div>
                        Email:{" "}
                        <a
                            href="mailto:hello@ai-media.example"
                            className="text-neutral-300 hover:text-fuchsia-300"
                        >
                            hello@ai-media.example
                        </a>
                    </div>
                    <div>Telegram: @your_ai_channel</div>
                    <div className="text-[10px] text-neutral-500">
                        © {new Date().getFullYear()} AI Media. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
