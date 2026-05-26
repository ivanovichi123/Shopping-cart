import { Navigate, replace } from "react-router";
import { App } from "./App";
import { ShopPage } from "./shopPage/ShopPage";
import { ErrorPage } from "./ErrorPage";

const routes = [
    {
        path: "/",
        element: <Navigate to="/home" replace/>
    },
    {
        path: "/home",
        element: <App />
    },
    {
        path: "/shop",
        element: <ShopPage />
    },
    {
        path: "*",
        element: <ErrorPage />
    }
]

export default routes