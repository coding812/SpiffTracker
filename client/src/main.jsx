import * as React from "react";
import { useState } from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import {Provider} from "react-redux";
import  store  from "./redux/store";

import App from "./App";
import Record from "./components/Record";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import "./index.css";


function Main() {

  const [loggedIn, setLoggedIn] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Record />,
        },
      ],
    },
    {
      path: "/about",
      element: <App />,
      children: [
        {
          path: "/about",
          element: <About />,
        },
      ],
    },
    {
      path: "/admin",
      element: <App />,
      children: [
        {
          path: "/admin",
          element: loggedIn ? <AdminPanel /> : <Navigate to="/login" />,
        },
      ],
    },
    {
      path: "/create",
      element: <App />,
      children: [
        {
          path: "/create",
          element: <Record />,
        },
      ],
    },
    {
      path: "/edit/:id",
      element: <App />,
      children: [
        {
          path: "/edit/:id",
          element: <Record />,
        },
      ],
    },
    {
      path: "/login",
      element: <App />,
      children: [
        {
          path: "/login",
          element: <Login
            setLoggedIn={setLoggedIn}
          />,
        },
      ],
    },
    {
      path: "/register",
      element: <App />,
      children: [
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);

  return (
  <RouterProvider router={router}  />);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </React.StrictMode>
);



