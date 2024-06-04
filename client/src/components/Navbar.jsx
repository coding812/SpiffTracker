import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setLoggedIn(!!token);
  }, []);

  let linkText;
  let linkPath;

  if (loggedIn) 
  {
    linkText = "Sign Out";
    linkPath = "/";
  } 
  else 
  {
    linkText = "Sign In";
    linkPath = "/login";
  }

  function handleLogout() {
    localStorage.removeItem("accessToken");
    setLoggedIn(false);
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  return (
    <div className="">
      <nav className="flex justify-end items-center mb-6">
        <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to={linkPath}
              onClick={() => loggedIn ? handleLogout() : handleLogin()}>
          {linkText}
        </NavLink>
      </nav>
    </div>
  );
}
