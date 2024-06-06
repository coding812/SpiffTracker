import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slice";

export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState);
  const [buttonVisible, setButtonVisible] = useState(false);
  const loggedIn = !!userState.token;
  const linkPath = loggedIn ? "/" : "/login";
  const linkText = loggedIn ? "Sign Out" : "Sign In";
  
  useEffect(() => {
    setButtonVisible(location.pathname !== "/login");
  }, [location.pathname]);
  
  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div className="">
      {buttonVisible ? (
      <nav className="flex justify-between items-center mb-6">
        <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3 mr-3" to="/">
          Home
        </NavLink>
        <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to={linkPath}
              onClick={() => loggedIn ? handleLogout() : null}>
          {linkText}
        </NavLink>
      </nav>
      ) : null}
    </div>
  );
}
