import { create } from 'zustand';

interface CinematicState {
  activeCraftIndex: number;
  setActiveCraftIndex: (index: number) => void;
  is3DLoaded: boolean;
  set3DLoaded: (loaded: boolean) => void;
  clapTrigger: number;
  triggerClap: () => void;
  introStage: 'preloading' | 'clapper' | 'ready';
  setIntroStage: (stage: 'preloading' | 'clapper' | 'ready') => void;
}



export const useCinematicStore = create<CinematicState>((set) => ({
  activeCraftIndex: 0,
  setActiveCraftIndex: (index) => set({ activeCraftIndex: index }),
  is3DLoaded: false,
  set3DLoaded: (loaded) => set({ is3DLoaded: loaded }),
  clapTrigger: 0,
  triggerClap: () => set((state) => ({ clapTrigger: state.clapTrigger + 1 })),
  introStage: 'preloading',
  setIntroStage: (stage) => set({ introStage: stage }),
}));


