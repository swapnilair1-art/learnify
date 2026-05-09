import create from 'zustand';

type ProgressState = {
  xp: number;
  level: number;
  streak: number;
  addXP: (amount: number) => void;
  reset: () => void;
};

export const useProgressStore = create<ProgressState>((set) => ({
  xp: 0,
  level: 1,
  streak: 0,
  addXP: (amount: number) =>
    set((s) => {
      const newXP = s.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      return { xp: newXP, level: newLevel };
    }),
  reset: () => set({ xp: 0, level: 1, streak: 0 })
}));
