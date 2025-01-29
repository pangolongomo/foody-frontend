import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import layout from "./components/layout/layout";
import OrderManagement from "./pages/OrderManagement";

const router = createBrowserRouter([
  {
    path: "/",
    Component: layout,
    children: [
      { index: true, Component: Home },
      {
        path: "/order",
        Component: OrderManagement,
      },
    ],
  },
]);

export default router;
