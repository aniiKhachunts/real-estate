import { Link } from "react-router-dom";

export default function TestimonialsCta() {
    return (
        <section className="bg-white">
            <div className="mx-auto w-full max-w-[1200px] px-4 py-10">
                <div
                    className="
            rounded-2xl
            bg-gradient-to-r from-slate-900 to-indigo-900
            text-white
            p-6 md:p-8
            shadow-sm
            overflow-visible
          "
                >
                    <blockquote className="max-w-3xl">
                        <p className="text-[17px] md:text-lg leading-relaxed tracking-normal">
                            “We found our dream home in a week. The listings felt trustworthy,
                            the map was super helpful, and the agent chat made everything easy.”
                        </p>
                        <footer className="mt-4 text-sm text-white/80">— Mariam &amp; Tigran</footer>
                    </blockquote>

                    <div className="mt-6 md:mt-0 md:absolute md:right-10 md:top-1/2 md:-translate-y-1/2">
                        <Link
                            to="/listings"
                            className="
                inline-flex items-center justify-center
                h-10 px-4
                rounded-xl
                bg-white/10 hover:bg-white/15
                text-white font-medium
                whitespace-nowrap
                leading-none
              "
                        >
                            Browse listings
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
