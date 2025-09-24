import { useCompare } from "../app/compareStore";
import { useQuery } from "@tanstack/react-query";
import { getAllProperties } from "../lib/api";

export default function Compare() {
    const ids = useCompare(s => s.ids);
    const clear = useCompare(s => s.clear);
    const { data } = useQuery({ queryKey: ["all"], queryFn: getAllProperties });
    const items = (data ?? []).filter(p => ids.includes(p.id));

    if (items.length === 0) return <div className="mx-auto max-w-[1200px] px-4 py-8">No items to compare.</div>;

    return (
        <div className="mx-auto max-w-[1200px] px-4 py-8 overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Compare</h1>
                <button onClick={clear} className="px-3 py-1.5 rounded border">Clear</button>
            </div>
            <table className="min-w-[800px] w-full border-separate border-spacing-y-2">
                <thead>
                <tr className="text-left text-slate-500 text-sm">
                    <th className="w-64">Property</th>
                    <th>Price</th>
                    <th>Beds</th>
                    <th>Baths</th>
                    <th>Area</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                {items.map(p => (
                    <tr key={p.id} className="bg-white border rounded-xl">
                        <td className="p-3">
                            <div className="flex gap-3 items-center">
                                <img src={p.images?.[0]}
                                     onError={(e) => ((e.currentTarget as HTMLImageElement).src = "")}
                                     className="h-16 w-24 object-cover rounded-lg border" alt="" loading="lazy"/>
                                <div>
                                    <div className="font-medium">{p.title}</div>
                                    <div
                                        className="text-xs text-slate-500">{p.address.city}{p.address.area ? `, ${p.address.area}` : ""}</div>
                                </div>
                            </div>
                        </td>
                        <td className="p-3">${p.price.toLocaleString()}</td>
                        <td className="p-3">{p.beds}</td>
                        <td className="p-3">{p.baths}</td>
                        <td className="p-3">{p.areaM2} m²</td>
                        <td className="p-3">{p.type}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
