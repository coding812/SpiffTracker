import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slice";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState);
  const [buttonVisible, setButtonVisible] = useState(false);
  const loggedIn = !!userState.token;
  const linkPath = loggedIn ? "/" : "/login";
  const linkText = loggedIn ? "Sign Out" : "Sign In";
  const homePath = loggedIn ? "/admin" : "/"; // TODO figure out why this isn't changing to '/' when session times out.
  
  useEffect(() => {
    setButtonVisible(location.pathname !== "/login");
  }, [location.pathname]);

  useEffect(() => {
    const checkLoggedInStatus = () => {
      if (!loggedIn){
        
      }
    };
    checkLoggedInStatus();
    // const intervalId = setInterval(checkLoggedInStatus, 1000 * 60 * 30); 
    const intervalId = setInterval(checkLoggedInStatus, 10000); 
    return () => clearInterval(intervalId);
  }, [loggedIn, navigate]); 

  useEffect(() => {
    // This code runs whenever loggedIn changes
    // You can place logic here if you need to do something specific when it changes
    
  }, [loggedIn]); 

  function handleLogout() {
    dispatch(logout());
  }
  

  return (
    <div className="">
      <nav className="flex items-center mb-6">
        <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-indigo-600 hover:bg-indigo-500 text-white h-9 rounded-md px-3 mr-3" to={homePath}>
          Home
        </NavLink>
        
        <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-indigo-600 hover:bg-indigo-500 text-white h-9 rounded-md px-3 mr-3" to="/about">
          About
        </NavLink>

        <div className="flex-grow"></div>

      {buttonVisible ? (
        <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-indigo-600 hover:bg-indigo-500 text-white h-9 rounded-md px-3" to={linkPath}
              onClick={() => loggedIn ? handleLogout() : null}>
          {linkText}
        </NavLink>
        ) : null}
      </nav>
    </div>
  );
}
