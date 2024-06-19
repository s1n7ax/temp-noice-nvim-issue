"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";

import {
  QState,
  createQStateStore,
  type QStateStore,
} from "@/stores/qustions/store";

export type QStateStoreApi = ReturnType<typeof createQStateStore>;

export const CounterStoreContext = createContext<QStateStoreApi | undefined>(
  undefined,
);

export interface QStateStoreProviderProps {
  value: QState;
  children: ReactNode;
}

export const QStateStoreProvider = ({
  children,
  value,
}: QStateStoreProviderProps) => {
  const storeRef = useRef<QStateStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createQStateStore(value);
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  );
};

export const useQStateStore = <T,>(selector: (store: QStateStore) => T): T => {
  const counterStoreContext = useContext(CounterStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
