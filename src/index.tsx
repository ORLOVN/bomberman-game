import React from "react";
import { hydrateRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import "@/assets/styles/global.scss";

import { Provider } from "react-redux";
import App from "@/components/App";

import createStore from "./store";
import { setClientMode } from "@/store/slices";
import { ServiceWorkersService } from "@/services/service-workers-service";

ServiceWorkersService.start();

// @ts-ignore
const initialState = window.__INITIAL_STATE__;
// @ts-ignore
delete window.__INITIAL_STATE__;

if (!initialState) console.log("Initial state is not passed from SSR");

const store = initialState
  ? createStore(JSON.parse(initialState))
  : createStore();

store.dispatch(setClientMode());

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
