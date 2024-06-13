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
import {useIdleTimer} from 'react-idle-timer';


function Main() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState.token);
  const [loggedIn, setLoggedIn] = useState(false);
  const [state, setState] = useState('Active');
  const [count, setCount] = useState(0);
  const [remaining, setRemaining] = useState(0);
  
  
  // Check if the user is logged in when the component mounts
  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     if (userState) {
  //       setLoggedIn(true);
  //     }
  //   };
  //   checkLoginStatus();
  // }, []);

  const onIdle = () => {
    setState('Idle');
    setLoggedIn(false);
    logout();
  }

  const onActive = () => {
    setState('Active');
  }

  const onAction = () => {
    setCount(count + 1);
  }

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout: 1000 * 60 * 30,
    throttle: 500
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000))
    }, 500);

    return () => {
      clearInterval(interval)
    };
  });

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



