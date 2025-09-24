import { useMemo, useState } from "react";

export default function MortgageCalculator({ price }: { price: number }) {
    const [down, setDown] = useState(20);
    const [rate, setRate] = useState(6.5);
    const [years, setYears] = useState(30);

    const { monthly, principal } = useMemo(() => {
        const principal = price * (1 - down / 100);
        const r = rate / 100 / 12;
        const n = years * 12;
        const monthly = r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
        return { monthly, principal };
    }, [price, down, rate, years]);

    return (
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="text-lg font-semibold">Mortgage estimate</div>
            <div className="mt-2 text-2xl font-bold">${Math.round(monthly).toLocaleString()}/mo</div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                <label className="flex flex-col">
                    <span className="text-slate-600">Down %</span>
                    <input type="number" className="h-10 rounded-lg border px-3" value={down}
                           onChange={(e)=>setDown(Number(e.target.value || 0))}/>
                </label>
                <label className="flex flex-col">
                    <span className="text-slate-600">Rate %</span>
                    <input type="number" step="0.1" className="h-10 rounded-lg border px-3" value={rate}
                           onChange={(e)=>setRate(Number(e.target.value || 0))}/>
                </label>
                <label className="flex flex-col">
                    <span className="text-slate-600">Years</span>
                    <input type="number" className="h-10 rounded-lg border px-3" value={years}
                           onChange={(e)=>setYears(Number(e.target.value || 0))}/>
                </label>
            </div>
            <div className="mt-2 text-xs text-slate-500">
                Principal: ${Math.round(principal).toLocaleString()} (excludes taxes/insurance/HOA).
            </div>
        </div>
    );
}
