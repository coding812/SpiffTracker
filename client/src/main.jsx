import * as React from "react";
import { useState, useEffect } from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import App from "./App";
import Record from "./components/Record";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import Register from "./components/Register";
import "./index.css";


function Main() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        setLoggedIn(true);
      }
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  // Show a loading message while the component is loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

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

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);



