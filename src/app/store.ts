import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SavedState = {
    savedIds: string[];
    toggle: (id: string) => void;
    isSaved: (id: string) => boolean;
    clear: () => void;
};

export const useSaved = create<SavedState>()(
    persist(
        (set, get) => ({
            savedIds: [],
            toggle: (id) =>
                set((state) => {
                    const setIds = new Set(state.savedIds);
                    setIds.has(id) ? setIds.delete(id) : setIds.add(id);
                    return { savedIds: Array.from(setIds) };
                }),
            isSaved: (id) => get().savedIds.includes(id),
            clear: () => set({ savedIds: [] }),
        }),
        {
            name: "saved-homes-v1",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
