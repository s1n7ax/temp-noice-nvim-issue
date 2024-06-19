import { createStore } from "zustand";

export interface QStateModel {
  id: number;
  answer: string;
  hasError: boolean;
}

export interface QState {
  qState: QStateModel[];
}

export type QStateActions = {
  updateQState: (id: number, newState: QStateModel) => void;
};

export type QStateStore = QState & QStateActions;

const defaultState: QState = {
  qState: [],
};

export const createQStateStore = (initState: QState = defaultState) => {
  return createStore<QStateStore>()((set) => ({
    ...initState,
    updateQState: (id: number, newState: QStateModel) =>
      set((state: QState) => ({
        qState: state.qState.map((item: QStateModel) =>
          item.id === id ? { ...newState, id: item.id } : item,
        ),
      })),
  }));
};
