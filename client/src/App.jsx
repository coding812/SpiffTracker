
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import AdminPanel from "./components/AdminPanel";

const App = () => {
  return (
    <div className="w-full p-6">
      <Navbar />
      {/* <Record /> */}
      {/* <AdminPanel /> */}
      <Outlet />
      {/* <RecordList /> */}
    </div>
  );
};
export default App;
