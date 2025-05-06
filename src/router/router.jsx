import { createBrowserRouter } from "react-router-dom";
import User_layout from "../components/layout/User_layout";
import Home from "../pages/home/Home";
import Scanner from "../pages/Scanner";
import UserDetails from "../pages/UserDetails";

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
    children: [{ path: "", element: <Scanner /> }],
  },
  {
    path: "/scanned-result",
    element: <User_layout />,
    children: [{ path: "/scanned-result", element: <UserDetails /> }],
  },
];

const router = createBrowserRouter([...client_routes]);

export default router;
