// src/components/home/Hero.tsx
import React from "react";

const Hero: React.FC = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-950">
            <div className="pointer-events-none absolute inset-0 opacity-40">
                {/* Soft gradient blobs for depth */}
                <div className="absolute -left-40 top-[-10rem] h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl" />
                <div className="absolute right-[-10rem] top-40 h-80 w-80 rounded-full bg-indigo-500/25 blur-3xl" />
            </div>

            <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 lg:flex-row lg:items-center lg:gap-16 lg:px-0 lg:py-20">
                {/* Left text block */}
                <div className="max-w-xl space-y-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-400">
                        AI directory & strategy hub
                    </p>

                    <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                        Собираем{" "}
                        <span className="bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-emerald-300 bg-clip-text text-transparent">
              системно-эффективные AI-инструменты
            </span>
                        <br />
                        которые двигают ваш бизнес.
                    </h1>

                    <p className="text-sm text-neutral-400 sm:text-base">
                        Один каталог, чтобы найти AI для контента, маркетинга, разработки,
                        аналитики и автоматизации. Фильтруй по задачам, бюджету и стэку — без
                        бесконечного гугла.
                    </p>

                    {/* Little trust row similar to “#1 рейтинга…” */}
                    <div className="flex flex-wrap gap-6 text-xs text-neutral-400">
                        <div>
                            <div className="text-sm font-semibold text-white">300+</div>
                            <div>AI-инструментов в каталоге</div>
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-white">20+</div>
                            <div>категорий и фильтров</div>
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-white">Realtime</div>
                            <div>обновление базы инструментов</div>
                        </div>
                    </div>
                </div>

                {/* Right “form” card similar to themedia hero */}
                <div className="max-w-sm flex-1">
                    <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 shadow-[0_0_60px_rgba(0,0,0,0.5)] backdrop-blur">
                        <h2 className="text-sm font-semibold text-white">
                            Нужен разбор по AI под ваш бизнес?
                        </h2>
                        <p className="mt-2 text-xs text-neutral-400">
                            Оставьте контакт, мы подберем набор AI-инструментов под ваш трафик,
                            контент и процессы.
                        </p>

                        <form className="mt-4 space-y-3">
                            <input
                                type="text"
                                placeholder="Ваше имя"
                                className="w-full rounded-2xl border border-white/10 bg-neutral-900/60 px-3 py-2 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-fuchsia-400"
                            />
                            <input
                                type="tel"
                                placeholder="Ваш Telegram или телефон"
                                className="w-full rounded-2xl border border-white/10 bg-neutral-900/60 px-3 py-2 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-fuchsia-400"
                            />
                            <select
                                className="w-full rounded-2xl border border-white/10 bg-neutral-900/60 px-3 py-2 text-sm text-white outline-none focus:border-fuchsia-400"
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Что хотите улучшить?
                                </option>
                                <option value="content">Контент и креативы</option>
                                <option value="performance">Рекламные кампании</option>
                                <option value="automation">Автоматизация процессов</option>
                                <option value="dev">Разработка и продукт</option>
                            </select>

                            <button
                                type="submit"
                                className="mt-2 w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-emerald-400 px-4 py-2 text-sm font-semibold text-neutral-950 shadow-lg shadow-fuchsia-500/30 transition hover:brightness-110"
                            >
                                Записаться на AI-разбор
                            </button>

                            <p className="pt-1 text-[10px] leading-snug text-neutral-500">
                                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
