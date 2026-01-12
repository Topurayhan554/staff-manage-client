import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../components/Home";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import EmployeeDatabase from "../page/Dashboard/EmployeeDatabase";
import NoticeBoard from "../page/Dashboard/NoticeBoard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "employee/database",
        element: <EmployeeDatabase />,
      },
      {
        path: "notice-board",
        element: <NoticeBoard />,
      },
    ],
  },
]);

export default router;
