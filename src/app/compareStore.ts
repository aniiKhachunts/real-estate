import { create } from "zustand";

type CompareState = { ids: string[]; toggle: (id: string) => void; clear: () => void };
export const useCompare = create<CompareState>((set) => ({
    ids: [],
    toggle: (id) => set((s) => {
        const setIds = new Set(s.ids);
        setIds.has(id) ? setIds.delete(id) : setIds.add(id);
        return { ids: Array.from(setIds).slice(0, 3) };
    }),
    clear: () => set({ ids: [] }),
}));
