import { useState } from "react";

type Props = { images: string[]; alt: string };
const FALLBACK = "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop";

export default function Gallery({ images, alt }: Props) {
    const [open, setOpen] = useState(false);
    const [i, setI] = useState(0);
    const srcs = images?.length ? images : [FALLBACK];

    return (
        <>
            <div className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden">
                <button className="col-span-4 md:col-span-3 relative aspect-[16/10] group"
                        onClick={() => {
                            setI(0);
                            setOpen(true);
                        }}>
                    <img src={srcs[0]} alt={alt} className="h-full w-full object-cover"
                         onError={(e) => (e.currentTarget as HTMLImageElement).src = FALLBACK}/>
                    <div className="absolute inset-0 ring-0 group-hover:ring-4 ring-white/60 transition"/>
                </button>
                <div className="hidden md:grid grid-rows-2 gap-2">
                    {srcs.slice(1, 3).map((s, idx) => (
                        <button key={idx} className="relative aspect-[16/10]" onClick={() => {
                            setI(idx + 1);
                            setOpen(true);
                        }}>
                            <img src={s} alt={`${alt} ${idx + 2}`} className="h-full w-full object-cover"
                                 onError={(e) => (e.currentTarget as HTMLImageElement).src = FALLBACK}/>
                        </button>
                    ))}
                </div>
            </div>

            {open && (
                <div role="dialog" aria-modal
                     className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm grid place-items-center p-4">
                    <div className="relative max-w-5xl w-full">
                        <button className="absolute -top-8 right-0 text-white/90" onClick={() => setOpen(false)}
                                aria-label="Close">Close ✕
                        </button>
                        <img src={srcs[i]} alt={`${alt} large`} className="w-full max-h-[80vh] object-contain"/>
                        <div className="mt-3 flex items-center justify-between text-white/80">
                            <button onClick={() => setI((i - 1 + srcs.length) % srcs.length)}
                                    className="px-3 py-1 rounded bg-white/10">Prev
                            </button>
                            <div className="text-sm">{i + 1} / {srcs.length}</div>
                            <button onClick={() => setI((i + 1) % srcs.length)}
                                    className="px-3 py-1 rounded bg-white/10">Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
