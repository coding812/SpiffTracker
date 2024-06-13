import React, { useEffect, useState } from "react";
import { NavLink , useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from 'react-redux';
import Record from "./RecordList";
const AdminPanel = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const userState = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  const companyId = userState.user.companyId;
  const accessToken = userState.token;

  if (!userState) {
    navigate('/login');
    return null; 
  }

  // Update sale in the database
  const updateRecord = async (id, updatedRecord) => {
    const response = await fetch(`http://localhost:5050/record/${id}`, {
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
    const response = await fetch(`http://localhost:5050/record?companyId=${companyId}`, {
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
    getRecords();
  }, [companyId]);

  // Delete a record from the database
  const deleteRecord = async (id) => {
    const newRecords = records.filter((el) => el._id !== id);

    let confirmDelete = window.confirm("Are you sure you want to delete this record?");

    if (!confirmDelete) {
      return;
    }

    await fetch(`http://localhost:5050/record/${id}`, {
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
        {/* <button className="inline-flex items-center justify-center text-sm font-medium border bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          onClick={() => setShowModal(true)}>
            Enter Sale
        </button>
        {showModal && <NewSale closeModal={() => setShowModal(false)} />} */}
        <NavLink
          className="inline-flex items-center justify-center text-md font-medium border bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to="/"
        >
          Enter Sale
        </NavLink>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b hover:bg-muted/50 data-[state=selected]:bg-muted">
                {/* <th className="h-12 px-4 text-left font-medium text-muted-foreground">
                  Company ID
                </th> */}
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">
                  Employee Name
                </th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">
                  Customer Name
                </th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">
                  Work Order #
                </th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">
                  Ticket Total
                </th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">
                  Expected Commission
                </th>
              </tr>
            </thead>
            <tbody>{recordList()}</tbody>
          </table>
        </div>
      </div>
      
    </>
  );
};

export default AdminPanel;


