"use client";

import React from "react";
import { Provider as ReduxProviderBase } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "@/store/store";
import Loading from "./Loading";

const Provider = ({ children }) => {
  return (
    <ReduxProviderBase store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        {children}
      </PersistGate>
    </ReduxProviderBase>
  );
};

export default Provider;
