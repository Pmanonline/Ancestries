import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store, { persistor } from "./store.js";
import "./App.css";
import ToastProvider from "./components/tools/toastProvider.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { AuthContextProvider } from "./components/context/AuthContext.jsx";
// import { QueryClient, QueryClientProvider } from "react-query";

const rootElement = document.getElementById("root");
// const queryClient = new QueryClient();

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          {/* <QueryClientProvider client={queryClient}> */}
          <AuthContextProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </AuthContextProvider>
          {/* </QueryClientProvider> */}
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Element with id 'root' not found");
}
