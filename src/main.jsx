import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./components/App";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./components/Routes";
import { CartContextWrapper } from "./contexts/cart.context";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartContextWrapper>
      <RouterProvider router={router} />
    </CartContextWrapper>
  </StrictMode>,
);
