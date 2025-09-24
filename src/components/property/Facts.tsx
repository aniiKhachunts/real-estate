type Props = { beds: number; baths: number; areaM2: number; type: string; year?: number };
export default function Facts({ beds, baths, areaM2, type, year }: Props) {
    const Item = ({ label, value }: { label: string; value: string | number }) => (
        <div className="rounded-xl border p-3 bg-white/60">
            <div className="text-xs text-slate-500">{label}</div>
            <div className="font-semibold">{value}</div>
        </div>
    );
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Item label="Bedrooms" value={beds}/>
            <Item label="Bathrooms" value={baths}/>
            <Item label="Area" value={`${areaM2} m²`}/>
            <Item label="Type" value={type}/>
            {year ? <Item label="Built" value={year}/> : null}
        </div>
    );
}
