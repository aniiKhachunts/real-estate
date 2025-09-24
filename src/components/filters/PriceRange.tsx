import { useEffect, useState } from "react";

type Props = {
    min?: number;
    max?: number;
    floor?: number;
    ceil?: number;
    step?: number;
    onChange: (min?: number, max?: number) => void;
};

export default function PriceRange({
                                       min, max, floor = 0, ceil = 1_000_000, step = 1000, onChange
                                   }: Props) {
    const [a, setA] = useState(min ?? floor);
    const [b, setB] = useState(max ?? ceil);

    useEffect(() => setA(min ?? floor), [min, floor]);
    useEffect(() => setB(max ?? ceil), [max, ceil]);

    const lo = Math.min(a, b);
    const hi = Math.max(a, b);
    const pctLo = ((lo - floor) / (ceil - floor)) * 100;
    const pctHi = ((hi - floor) / (ceil - floor)) * 100;

    useEffect(() => {
        const id = setTimeout(() => onChange(lo, hi), 150);
        return () => clearTimeout(id);
    }, [lo, hi, onChange]);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-1 text-xs text-slate-600">
                <span>${lo.toLocaleString()}</span>
                <span>${hi.toLocaleString()}</span>
            </div>

            <div className="relative h-9">

                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-slate-200" />

                <div
                    className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-indigo-500"
                    style={{ left: `${pctLo}%`, right: `${100 - pctHi}%` }}
                />
                <input
                    type="range"
                    min={floor}
                    max={ceil}
                    step={step}
                    value={a}
                    onChange={(e) => setA(Number(e.target.value))}
                    className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-auto"
                />
                <input
                    type="range"
                    min={floor}
                    max={ceil}
                    step={step}
                    value={b}
                    onChange={(e) => setB(Number(e.target.value))}
                    className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-auto"
                />

                <div
                    className="absolute h-5 w-5 -mt-2.5 rounded-full bg-white border shadow"
                    style={{ left: `calc(${pctLo}% - 10px)`, top: "50%" }}
                />
                <div
                    className="absolute h-5 w-5 -mt-2.5 rounded-full bg-white border shadow"
                    style={{ left: `calc(${pctHi}% - 10px)`, top: "50%" }}
                />
            </div>
        </div>
    );
}
