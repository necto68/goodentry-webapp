import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./features/app/components/App";

const container = document.querySelector("#root") ?? document.body;
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
