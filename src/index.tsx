import React from "react";
import { hydrateRoot } from 'react-dom/client';

import { BrowserRouter } from "react-router-dom";

import "@/assets/styles/global.scss";

import { Provider } from "react-redux";
import App from "@/components/App";

import createStore from "./store";
import { ServiceWorkersService } from "@/services/service-workers-service";

ServiceWorkersService.start();

const store = createStore();

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
);
