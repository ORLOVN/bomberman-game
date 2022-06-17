import React from "react";
import { createRoot } from "react-dom/client";
import "@/assets/styles/global.scss";

import { Provider } from "react-redux";
import App from "@/components/App";

import store from "./store";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
