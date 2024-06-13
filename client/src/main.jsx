import * as React from "react";
import { useState, useEffect } from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import {Provider} from "react-redux";
import  store  from "./redux/store";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './redux/slice';

import App from "./App";
import Record from "./components/Record";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import "./index.css";

function Main() {
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState.token);
  
  
  // Check if the user is logged in when the component mounts
  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     if (userState) {
  //       setLoggedIn(true);
  //     }
  //   };
  //   checkLoginStatus();
  // }, []);


  useEffect(() => {
    const checkLoginStatus = async () => {
      if (userState) {
        // Decode the token to get its expiration time
        const decodedToken = jwtDecode(userState.token);
        const currentTime = Date.now() / 1000; // Convert to seconds
  
        // Check if the token has expired
        if (decodedToken.exp < currentTime) {
          // Token has expired, update state accordingly
          setLoggedIn(false);
        } else {
          // Token is still valid
          setLoggedIn(true);
        }
      } else {
        // No token found, user is not logged in
        setLoggedIn(false);
      }
    };
  
    checkLoginStatus();
  }, [userState]);

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



