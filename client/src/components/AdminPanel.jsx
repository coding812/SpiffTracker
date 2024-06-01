// import { useEffect, useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";

// const Record = (props) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedRecord, setEditedRecord] = useState({...props.record});

//   const handleInputChange = (e) => {
//     setEditedRecord({
//       ...editedRecord,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = async () => {
//     try {
//       await props.updateRecordList(props.record._id, editedRecord);
//       console.log(props.record._id, editedRecord);
//       setIsEditing(false);
//     } 
//     catch (error) {
//       console.error("Error saving record:", error);
//     }
//   };

//   const handleCancelClick = () => {
//     setIsEditing(false);
//     setEditedRecord(props.record);
//   };

//   if (!props.record) {
//     return <div>Loading...</div>;
//   }



//   return (
//     <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
//       <td className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground"
//       name="companyId"
//       value={props.record.companyId}>
//         {props.record.companyId}
//       </td>
//       <td className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
//         {isEditing ? (
//           <input
//             type="text"
//             name="employeeName"
//             value={editedRecord.employeeName}
//             onChange={handleInputChange}
//           />
//         ) : (
//           props.record.employeeName
//         )}
//       </td>
//       <td className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
//         {isEditing ? (
//           <input
//             type="text"
//             name="customerName"
//             value={editedRecord.customerName}
//             onChange={handleInputChange}
//           />
//         ) : (
//           props.record.customerName
//         )}
//       </td>
//       <td className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
//         {isEditing ? (
//           <input
//             type="text"
//             name="workOrder"
//             value={editedRecord.workOrder}
//             onChange={handleInputChange}
//           />
//         ) : (
//           props.record.workOrder
//         )}
//       </td>
//       <td className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
//         {isEditing ? (
//           <input
//             type="text"
//             name="saleAmount"
//             value={editedRecord.saleAmount}
//             onChange={handleInputChange}
//           />
//         ) : (
//           props.record.saleAmount
//         )}
//       </td>
//       <td className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
//         {isEditing ? (
//           <input
//             type="text"
//             name="expectedCommission"
//             value={editedRecord.expectedCommission}
//             onChange={handleInputChange}
//           />
//         ) : (
//           props.record.expectedCommission
//         )}
//       </td>
//       <td className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
//         <div className="flex space-x-2">
//           {isEditing ? (
//             <>
//               <button
//                 className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
//                 onClick={handleSaveClick}
//               >
//                 Save
//               </button>
//               <button
//                 className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
//                 onClick={handleCancelClick}
//               >
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
//                 // to={`/edit/${props.record._id}`}
//                 onClick={handleEditClick}
//               >
//                 Edit
//               </button>
//               {isEditing && <button onClick={handleSaveClick}>Save</button>}
//               <button
//                 className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
//                 color="red"
//                 type="button"
//                 onClick={() => {
//                   props.deleteRecord(props.record._id);
//                 }}
//               >
//                 Delete
//               </button>
//             </>
//           )}
//         </div>
//       </td>
//     </tr>
//   );
// };

// export default function RecordList() {
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();
//   const companyId = location.state.companyId;

//   async function updateRecordList(id, updatedRecord) {
//     const response = await fetch(`http://localhost:5050/record/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
//       },
//       body: JSON.stringify(updatedRecord)
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const updatedRecords = await response.json();
//     console.log("updateRecordLis result", updatedRecords);
//     setRecords(updatedRecords);
//   }

//   // This method fetches the records from the database.
//   useEffect(() => {
//     async function getRecords() {
//       const response = await fetch(`http://localhost:5050/record?companyId=${companyId}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
//         },
//       }
//       );
//       if (!response.ok) {
//         const message = `An error occurred: ${response.statusText}`;
//         console.error(message);
//         response.text().then("AdminPanel.js line 67", console.log);
//         return;
//       }
//       const records = await response.json();

//       if (Array.isArray(records)) {
//         setLoading(false);
//         setRecords(records);
//       } else {
//         console.error('Data returned from the API is not an array:', records);
//       }
//     }
//     getRecords();
//   }, [companyId]);

//   // This method will delete a record
//   async function deleteRecord(id) {
//     await fetch(`http://localhost:5050/record/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
//       },
//     });
//     const newRecords = records.filter((el) => el._id !== id);
//     setRecords(newRecords);
//   }


//   console.log("RecordList records", records);
//   // This method will map out the records on the table
//   function recordList() {

//     if (loading) {
//       return <div>Loading...</div>;
//     };

//     if (!Array.isArray(records)) {
//       console.error('records is not an array:', records);
//       return null;
//     }
//     return records.map((record, id) => {
//       return (
//         <Record
//           key={id}
//           record={record}
//           deleteRecord={() => deleteRecord(record._id)}
//           updateRecordList={updateRecordList}
//         />
//       );
//     });
//   }

//   return (
//     <>
//       <div className="flex justify-between items-center mb-2">
//         <h3 className="text-lg font-semibold p-4">Previous Sales</h3>
//         <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to="/">
//           Enter Sale
//         </NavLink>
//       </div>


//       <div className="border rounded-lg overflow-hidden">
//         <div className="relative w-full overflow-auto">
//           <table className="w-full caption-bottom text-sm">
//             <thead className="[&amp;_tr]:border-b">
//               <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
//                 <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
//                   Company ID
//                 </th>
//                 <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
//                   Employee Name
//                 </th>
//                 <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
//                   Customer Name
//                 </th>
//                 <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
//                   Work Order #
//                 </th>
//                 <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
//                   Ticket Total
//                 </th>
//                 <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
//                   Expected Commission
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="[&amp;_tr:last-child]:border-0">
//               {recordList()}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Record = ({ record, updateRecord, deleteRecord }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecord, setEditedRecord] = useState({ ...record });

  const handleInputChange = (e) => {
    setEditedRecord({
      ...editedRecord,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await updateRecord(record._id, editedRecord);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving record:", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedRecord(record);
  };

  if (!record) {
    return <div>Loading...</div>;
  }

  return (
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <td className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
        {record.companyId}
      </td>
      <td className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
        {isEditing ? (
          <input
            type="text"
            name="employeeName"
            value={editedRecord.employeeName}
            onChange={handleInputChange}
          />
        ) : (
          record.employeeName
        )}
      </td>
      <td className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
        {isEditing ? (
          <input
            type="text"
            name="customerName"
            value={editedRecord.customerName}
            onChange={handleInputChange}
          />
        ) : (
          record.customerName
        )}
      </td>
      <td className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
        {isEditing ? (
          <input
            type="text"
            name="workOrder"
            value={editedRecord.workOrder}
            onChange={handleInputChange}
          />
        ) : (
          record.workOrder
        )}
      </td>
      <td className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
        {isEditing ? (
          <input
            type="text"
            name="saleAmount"
            value={editedRecord.saleAmount}
            onChange={handleInputChange}
          />
        ) : (
          record.saleAmount
        )}
      </td>
      <td className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
        {isEditing ? (
          <input
            type="text"
            name="expectedCommission"
            value={editedRecord.expectedCommission}
            onChange={handleInputChange}
          />
        ) : (
          record.expectedCommission
        )}
      </td>
      <td className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                className="inline-flex items-center justify-center text-sm font-medium border bg-background hover:bg-slate-100 h-9 rounded-md px-3"
                onClick={handleSaveClick}
              >
                Save
              </button>
              <button
                className="inline-flex items-center justify-center text-sm font-medium border bg-background hover:bg-slate-100 h-9 rounded-md px-3"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="inline-flex items-center justify-center text-sm font-medium border bg-background hover:bg-slate-100 h-9 rounded-md px-3"
                onClick={handleEditClick}
              >
                Edit
              </button>
              <button
                className="inline-flex items-center justify-center text-sm font-medium border bg-background hover:bg-slate-100 h-9 rounded-md px-3"
                type="button"
                onClick={() => deleteRecord(record._id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

const RecordList = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const companyId = location.state.companyId;

  const updateRecord = async (id, updatedRecord) => {
    const response = await fetch(`http://localhost:5050/record/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(updatedRecord),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };


  const getRecords = async () => {
    const response = await fetch(`http://localhost:5050/record?companyId=${companyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
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

  useEffect(() => {
    getRecords();
  }, [companyId]);

  const deleteRecord = async (id) => {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  };

  const recordList = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
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
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">
                  Company ID
                </th>
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

export default RecordList;



