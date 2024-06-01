
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="w-full p-6">
      <Navbar />
      <Outlet />
      <ToastContainer />
    </div>
  );
};
export default App;
