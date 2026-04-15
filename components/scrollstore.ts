// scrollStore.ts
import { create } from 'zustand';

export const useScrollStore = create<{
    progress: number;
    setProgress: (progress: number) => void;
}>((set) => ({
    progress: 0,
    setProgress: (progress) => set({ progress: Math.max(0, Math.min(1, progress)) }),
}));