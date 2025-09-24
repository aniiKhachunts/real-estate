import { Link, NavLink, useLocation } from "react-router-dom";

function NavItem({ to, children, hero }: { to: string; children: React.ReactNode; hero: boolean }) {
    const base = "px-3 py-2 rounded-lg transition-colors";
    const heroCls =
        "text-white/90 hover:text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40";
    const normal =
        "text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-slate-300";

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `${base} ${hero ? heroCls : normal} ${isActive ? (hero ? "bg-white/15" : "bg-slate-100") : ""}`
            }
        >
            {children}
        </NavLink>
    );
}

export default function Header() {
    const { pathname } = useLocation();
    const hero = pathname === "/";

    return (
        <header
            className={
                hero
                    ? "absolute inset-x-0 top-0 z-30"
                    : "sticky top-0 z-30 bg-white/80 backdrop-blur border-b"
            }
        >
            <div className="mx-auto w-full max-w-[1200px] px-4 h-16 flex items-center justify-between">
                <Link to="/" className={`font-semibold ${hero ? "text-white" : "text-slate-900"}`}>
                    RealEstate
                </Link>

                <nav className="flex items-center gap-1">
                    <NavItem to="/listings" hero={hero}>Listings</NavItem>
                    <NavItem to="/saved" hero={hero}>Saved</NavItem>
                </nav>
            </div>
        </header>
    );
}
