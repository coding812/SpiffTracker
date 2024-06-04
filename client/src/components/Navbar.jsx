import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const [linkText, setLinkText] = useState("");
  const [linkPath, setLinkPath] = useState("");
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setLoggedIn(!!token);
    setButtonVisible(location.pathname === "/login" ? false : true);
    setLinkPath(loggedIn ? "/" : "/login");
    setLinkText(loggedIn ? "Sign Out" : "Sign In");
  }, [loggedIn, location]);

  function handleLogout() {
    localStorage.removeItem("accessToken");
    setLoggedIn(false);
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  return (
    <div className="">
      {buttonVisible ? (
      <nav className="flex justify-end items-center mb-6">
        <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to={linkPath}
              onClick={() => loggedIn ? handleLogout() : handleLogin()}>
          {linkText}
        </NavLink>
      </nav>
      ) : null}
    </div>
  );
}
