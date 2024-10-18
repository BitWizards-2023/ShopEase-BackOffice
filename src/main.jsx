import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./store/inedex.js"; // Import the store
import "./index.css";

import * as serviceWorkerRegistration from "../serviceWorkerRegistration.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

serviceWorkerRegistration.register();
