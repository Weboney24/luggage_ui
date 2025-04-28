import { createBrowserRouter } from "react-router-dom";
import User_layout from "../components/layout/User_layout";
import Home from "../pages/home/Home";
import Scanner from "../pages/Scanner";
import Login from "../admin/pages/auth/Login";
import Layout from "../admin/components/layout/Layout";
import Dashboard from "../admin/pages/home/Dashboard";
import ExcelUpload from "../admin/pages/home/ExcelUpload";

let client_routes = [
  {
    path: "/",
    element: <User_layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/barcodescanner",
    element: <User_layout />,
    children: [{ path: "/barcodescanner", element: <Scanner /> }],
  },
];

let admin_routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin-dashboard",
    element: <Layout />,
    children: [{ path: "/admin-dashboard", element: <Dashboard /> }],
  },
  {
    path: "/admin-uploadexcelsheet",
    element: <Layout />,
    children: [{ path: "/admin-uploadexcelsheet", element: <ExcelUpload /> }],
  },
];

const router = createBrowserRouter([...client_routes, ...admin_routes]);

export default router;
