import React from "react";
import { createRoot } from "react-dom/client";
import "@/assets/styles/global.scss";

import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import App from "@/components/App";

import store from "./store";
import { ServiceWorkersService } from "@/services/service-workers-service";

ServiceWorkersService.start();

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </Provider>
);
