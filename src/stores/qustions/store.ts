import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const questionSlice = createSlice({
  name: "questions",
  initialState: [] as QStateModel[],
  reducers: {
    initializeQState: (_, action: PayloadAction<QStateModel[]>) => {
      return action.payload;
    },
    updateQState: (
      state,
      action: PayloadAction<{ id: number; newState: QStateModel }>,
    ) => {
      const index = state.findIndex((q) => action.payload.id === q.id);
      state[index] = action.payload.newState;
      return state;
    },
  },
});

export const { initializeQState, updateQState } = questionSlice.actions;

export const makeStore = () => {
  return configureStore({
    reducer: {
      questions: questionSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
