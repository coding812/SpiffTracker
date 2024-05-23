
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Record from "./components/Record";

const App = () => {
  return (
    <div className="w-full p-6">
      <Navbar />
      <Record />
      {/* <Outlet /> */}
    </div>
  );
};
export default App;
