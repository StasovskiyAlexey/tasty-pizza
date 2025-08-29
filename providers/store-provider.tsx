'use client'

import useDataStore, { DataStore } from "@/store/data-store";
import type { MainStore } from "@/store/main-store";
import useMainStore from "@/store/main-store";

import { createContext, useContext } from "react";

type StoresContextType = {
  mainStore: MainStore;
  dataStore: DataStore;
};

const StoreContext = createContext<StoresContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mainStore = useMainStore();
  const dataStore = useDataStore();

  return <StoreContext.Provider value={{mainStore, dataStore}}>
    {children}
  </StoreContext.Provider>
}

export const useStoreContext = (): StoresContextType => {
    const context = useContext(StoreContext);
    if (!context) throw new Error("Чтобы использовать стор нужно чтобы он был обёрнут в провайдер");
    return context;
};