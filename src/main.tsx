import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrdersPage from "./orders/OrdersPage.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.tsx";
import ErrorPage from "./ErrorPage.tsx";
import StaffPage from "./staff/StaffPage.tsx";
import MenuItemCreatePage from "./menuItems/MenuItemCreatePage.tsx";
import MenuItemEditPage from "./menuItems/MenuItemEditPage.tsx";
import MenuItemsPage from "./menuItems/MenuItemsPage.tsx";
import StaffCreatePage from "./staff/StaffCreatePage.tsx";
import StaffEditPage from "./staff/StaffEditPage.tsx";


const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "menuitems", element: <MenuItemsPage /> },
      { path: "menuitems/create", element: <MenuItemCreatePage /> },
      { path: "menuitems/edit/:id", element: <MenuItemEditPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "staff", element: <StaffPage /> },
      { path: "staff/create", element: <StaffCreatePage />},
      { path: "staff/edit/:id", element: <StaffEditPage />},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

