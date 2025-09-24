export default function SkeletonCard() {
    return (
        <div className="animate-pulse bg-white border rounded-2xl overflow-hidden">
            <div className="h-40 bg-slate-200"/>
            <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-200 rounded w-3/4"/>
                <div className="h-3 bg-slate-200 rounded w-1/2"/>
                <div className="h-3 bg-slate-200 rounded w-2/3"/>
            </div>
        </div>
    );
}
