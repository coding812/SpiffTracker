import React, { useEffect, useState } from "react";
import { NavLink , useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import Record from "./RecordList";
import  BaseUrl  from "./BaseUrl";
import {motion} from "framer-motion";

// FRAMER MOTION ANIMATION
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const AdminPanel = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const userState = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userState.token) {
      navigate('/login');
      toast.error('Please log back in to continue');
    }
  }, [userState.token, navigate]);

  const companyId = userState.user ? userState.user.companyId : null;
  const accessToken = userState.token;

  

  // Update sale in the database
  const updateRecord = async (id, updatedRecord) => {
    const response = await fetch(`${BaseUrl}/record/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedRecord),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    await getRecords();
  };

  // Get all sales from the database associated with the companyId
  const getRecords = async () => {
    const response = await fetch(`${BaseUrl}/record?companyId=${companyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      console.error(message);
      return;
    }
    const records = await response.json();
    if (Array.isArray(records)) {
      setLoading(false);
      setRecords(records);
    } else {
      console.error("Data returned from the API is not an array:", records);
    }
  };

  // Update the records when the companyId changes
  useEffect(() => {
    if (userState.token && companyId){
      getRecords();
    }
  }, [userState.token, companyId]);

  // Delete a record from the database
  const deleteRecord = async (id) => {
    const newRecords = records.filter((el) => el._id !== id);

    let confirmDelete = window.confirm("Are you sure you want to delete this record?");

    if (!confirmDelete) {
      return;
    }

    await fetch(`${BaseUrl}/record/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    
    setRecords(newRecords);
    toast.success("Record deleted successfully");
  };

  // Display the list of records
  const recordList = () => {
    if (!Array.isArray(records)) {
      console.error("records is not an array:", records);
      return null;
    }
    return records.map((record, id) => (
        <Record
        key={id}
        record={record}
        deleteRecord={deleteRecord}
        updateRecord={updateRecord}
        />
        
    ));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold p-4">Previous Sales</h3>
        
        <NavLink
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  bg-indigo-600 hover:bg-indigo-500 text-white h-9 rounded-md px-3 mr-3"
          to="/"
        >
          Enter Sale
        </NavLink>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
      >
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-14 px-4 text-left font-medium text-muted-foreground">
                  Employee Name
                </th>
                <th className="h-14 px-4 text-left font-medium text-muted-foreground">
                  Customer Name
                </th>
                <th className="h-14 px-4 text-left font-medium text-muted-foreground">
                  Work Order #
                </th>
                <th className="h-14 px-4 text-left font-medium text-muted-foreground">
                  Ticket Total
                </th>
                <th className="h-14 px-4 text-left font-medium text-muted-foreground">
                  Commission
                </th>
              </tr>
            </thead>

              <tbody>{recordList()}</tbody>
          </table>
        </div>
      </div>
      </motion.div>
    </>
  );
};

export default AdminPanel;


