// import { StrictMode } from "react";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/index.tsx";

import App from "./App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  // </StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
