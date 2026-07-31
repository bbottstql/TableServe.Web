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
import OrderDetailPage from "./orders/OrderDetailPage.tsx";
import CategoryDetailPage from "./categories/CategoryDetailPage.tsx";
import CategoriesPage from "./categories/CategoriesPage.tsx";
import OrderItemCreatePage from "./orderItems/OrderItemCreatePage.tsx";
import OrderItemEditPage from "./orderItems/OrderItemEditPage.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "menuitems", element: <MenuItemsPage /> },
      { path: "menuitems/create", element: <MenuItemCreatePage /> },
      { path: "menuitems/edit/:id", element: <MenuItemEditPage /> },
      {
        path: "orders/detail/:id/orderitem/create",
        element: <OrderItemCreatePage />,
      },
      {
        path: "orders/detail/:id/orderitem/edit/:itemId",
        element: <OrderItemEditPage />,
      },
      { path: "orders", element: <OrdersPage /> },
      { path: "orders/detail/:id", element: <OrderDetailPage /> },
      { path: "staff", element: <StaffPage /> },
      { path: "staff/create", element: <StaffCreatePage /> },
      { path: "staff/edit/:id", element: <StaffEditPage /> },
      { path: "categories/detail/:id", element: <CategoryDetailPage /> },
      { path: "categories", element: <CategoriesPage /> },
      // { path: "categories/edit/:id", element: < />},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
