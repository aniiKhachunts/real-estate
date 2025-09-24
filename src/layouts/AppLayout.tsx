import { useLocation } from "react-router-dom";
import Header from "./Header.tsx";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { pathname } = useLocation();
    const isHome = pathname === "/";

    return (
        <div className="min-h-dvh flex flex-col">
            <Header/>

            <main className="flex-1">{children}</main>

            {!isHome && (
                <footer className="mt-12 border-t bg-white/70 backdrop-blur">
                    <div
                        className="mx-auto max-w-[1200px] px-4 py-6 text-sm text-slate-600 flex flex-wrap gap-4 justify-between">
                        <div>© {new Date().getFullYear()} RealEstate.</div>
                        <nav className="flex gap-4">
                            <a href="#" className="hover:underline">Privacy</a>
                            <a href="#" className="hover:underline">Terms</a>
                            <a href="#" className="hover:underline">Contact</a>
                        </nav>
                    </div>
                </footer>

            )}
        </div>
    );
}
