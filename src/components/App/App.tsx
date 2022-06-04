import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactNotifications } from "react-notifications-component";
import { ErrorBoundary } from "@/components/ErrorHandler/ErrorBoundary";
import ShowcaseComponent from "@/components/ShowcaseComponent";

export default function App() {
  return (
    <ChakraProvider>
      <ReactNotifications />
      <ErrorBoundary>
        <ShowcaseComponent />
      </ErrorBoundary>
    </ChakraProvider>
  );
}
