type Props = {
    price: number;
    onSchedule: () => void;
};
export default function InquiryCard({ price, onSchedule }: Props) {
    return (
        <aside className="sticky top-24 bg-white border rounded-2xl p-4 shadow-sm">
            <div className="text-2xl font-semibold text-brand-600">${price.toLocaleString()}</div>
            <p className="text-sm text-slate-600 mt-1">No agent fees. Verified listing.</p>
            <button onClick={onSchedule}
                    className="mt-4 w-full h-11 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium">
                Schedule a tour
            </button>
            <button className="mt-2 w-full h-11 rounded-xl border">Message agent</button>
        </aside>
    );
}
