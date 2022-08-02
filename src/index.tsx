import React from "react";
import { hydrateRoot } from 'react-dom/client';

import { BrowserRouter } from "react-router-dom";

import "@/assets/styles/global.scss";

import { Provider } from "react-redux";
import App from "@/components/App";

import createStore from "./store";
import { ServiceWorkersService } from "@/services/service-workers-service";

ServiceWorkersService.start();

// @ts-ignore
const initialState = window.__INITIAL_STATE__;
// @ts-ignore
delete window.__INITIAL_STATE__;

const store = createStore(JSON.parse(initialState));

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
);
