function range(from: number, to: number) {
    return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

function makePages(totalPages: number, page: number) {
    if (totalPages <= 7) return range(1, totalPages);
    const left = Math.max(2, page - 1);
    const right = Math.min(totalPages - 1, page + 1);
    const pages = [1];
    if (left > 2) pages.push(-1);
    for (let p = left; p <= right; p++) pages.push(p);
    if (right < totalPages - 1) pages.push(-2);
    pages.push(totalPages);
    return pages;
}

export default function Pagination({
                                       total,
                                       page,
                                       pageSize,
                                       onPageChange,
                                   }: {
    total: number;
    page: number;
    pageSize: number;
    onPageChange: (next: number) => void;
}) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const pages = makePages(totalPages, page);

    return (
        <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
            <button
                type="button"
                className="h-9 px-3 rounded-lg border bg-white disabled:opacity-50"
                onClick={() => onPageChange(Math.max(1, page - 1))}
                disabled={page <= 1}
            >
                Previous
            </button>

            <ul className="flex items-center gap-1">
                {pages.map((p, i) =>
                    p > 0 ? (
                        <li key={i}>
                            <button
                                type="button"
                                className={`h-9 min-w-9 px-3 rounded-lg border ${
                                    p === page
                                        ? "bg-slate-900 text-white border-slate-900"
                                        : "bg-white hover:bg-slate-50"
                                }`}
                                onClick={() => onPageChange(p)}
                                aria-current={p === page ? "page" : undefined}
                            >
                                {p}
                            </button>
                        </li>
                    ) : (
                        <li key={i} className="px-2 text-slate-500 select-none">…</li>
                    )
                )}
            </ul>

            <button
                type="button"
                className="h-9 px-3 rounded-lg border bg-white disabled:opacity-50"
                onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
            >
                Next
            </button>
        </nav>
    );
}
