import create from 'zustand'
import { persist } from "zustand/middleware";

const store = (set) => ({
    user: '-1',

    setUser: (user) => set({ user })
  })

export const useStore = create(persist(store, { name: "ideas" }));

