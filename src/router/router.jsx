import { createBrowserRouter } from "react-router-dom";
import User_layout from "../components/layout/User_layout";
import Home from "../pages/home/Home";

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
];

const router = createBrowserRouter([...client_routes]);

export default router;
