import { create } from "zustand";

export const usePreview = create((set) => ({
    preview: "",
    updatePreview: (preview: string) =>
        set({ preview: `https://b.ppy.sh/preview/${preview}.mp3` }),
}));
