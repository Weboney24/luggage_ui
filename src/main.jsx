import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "@ant-design/v5-patch-for-react-19";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
