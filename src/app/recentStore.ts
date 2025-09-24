import { create } from "zustand";

type RecentState = { ids: string[]; push: (id: string) => void; clear: () => void };
export const useRecent = create<RecentState>((set) => ({
    ids: [],
    push: (id) => set((s) => {
        const next = [id, ...s.ids.filter(x => x !== id)].slice(0, 8);
        try {
            localStorage.setItem("recent", JSON.stringify(next));
        } catch {
        }
        return { ids: next };
    }),
    clear: () => set({ ids: [] })
}));
try {
    const raw = localStorage.getItem("recent");
    if (raw) useRecent.setState({ ids: JSON.parse(raw) });
} catch {
}
