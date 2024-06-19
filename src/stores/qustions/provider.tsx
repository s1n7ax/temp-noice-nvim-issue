"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore, QStateModel, initializeQState } from "./store";

export default function StoreProvider({
  children,
  questionInit,
}: {
  children: React.ReactNode;
  questionInit: QStateModel[];
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeQState(questionInit));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
