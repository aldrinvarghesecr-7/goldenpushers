import { create } from 'zustand';

interface CinematicState {
  activeCraftIndex: number;
  setActiveCraftIndex: (index: number) => void;
  is3DLoaded: boolean;
  set3DLoaded: (loaded: boolean) => void;
}

export const useCinematicStore = create<CinematicState>((set) => ({
  activeCraftIndex: 0,
  setActiveCraftIndex: (index) => set({ activeCraftIndex: index }),
  is3DLoaded: false,
  set3DLoaded: (loaded) => set({ is3DLoaded: loaded }),
}));
