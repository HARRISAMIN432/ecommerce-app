"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./Loading";

const Provider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={Loading} persistor={store}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default Provider;
