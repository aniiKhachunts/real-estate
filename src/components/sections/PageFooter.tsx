export default function PageFooter() {
    return (
        <footer className="bg-white border-t">
            <div
                className="mx-auto w-full max-w-[1200px] px-4 py-8 text-sm text-slate-500 flex flex-wrap items-center justify-between gap-3">
                <div>© {new Date().getFullYear()} RealEstate</div>
                <nav className="flex gap-4">
                    <a className="hover:underline" href="#">Privacy</a>
                    <a className="hover:underline" href="#">Terms</a>
                    <a className="hover:underline" href="#">Contact</a>
                </nav>
            </div>
        </footer>
    );
}
