import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./services/store.js";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>
);
