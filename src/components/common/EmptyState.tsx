type Props = { title: string; hint?: string; action?: React.ReactNode };
export default function EmptyState({ title, hint, action }: Props) {
    return (
        <div className="text-center p-10 rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="text-lg font-semibold text-slate-900">{title}</div>
            {hint && <div className="text-slate-500 mt-1">{hint}</div>}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}
