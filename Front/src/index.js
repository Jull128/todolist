import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegPage from "./pages/RegPage/RegPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { HomePage } from "./pages/HomePage/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <NotFoud />,
    children: [
      {
        path: "/signup",
        element: <RegPage />,
      },
      {
        path: "/signin",
        element: <LoginPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
