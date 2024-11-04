import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store, { persistor } from "./store.js";
import "./App.css";
import ToastProvider from "./components/tools/toastProvider.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { AuthContextProvider } from "./components/context/AuthContext.jsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <AuthContextProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </AuthContextProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Element with id 'root' not found");
}
