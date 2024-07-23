import { create } from "zustand";

type CurrentDateStore = {
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
}

export const useCurrentDate = create<CurrentDateStore>()((set) => ({
    currentDate: new Date(),
    setCurrentDate: (date: Date) => set({ currentDate: date }),
}))