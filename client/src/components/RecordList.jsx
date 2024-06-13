import React, { useEffect, useState } from "react";
import { NavLink , useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/slice';

import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine} from "react-icons/ri";
import { FaRegSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";


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
      toast.success("Sale updated successfully");
      setIsEditing(false);
    } 
    catch (error) {
      console.error("Error saving record:", error);
    }
  };

  const handleCancelClick = () => {
    toast.error("Edit cancelled, changes not saved");
    setIsEditing(false);
    setEditedRecord(record);
  };

  if (!record) {
    return <div>No sales...</div>;
  }

  return (
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      {/* <td className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
        {record.companyId}
        </td> */}
      <td className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
        {isEditing ? (
          <input
            className="bg-background border border-muted/50 rounded-md px-3 h-9"
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
            className="bg-background border border-muted/50 rounded-md px-3 h-9"
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
            className="bg-background border border-muted/50 rounded-md px-3 h-9"
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
            className="bg-background border border-muted/50 rounded-md px-3 h-9"
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
            className="bg-background border border-muted/50 rounded-md px-3 h-9"
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
              {/* <button
                className="inline-flex items-center justify-center text-sm font-medium border bg-background hover:bg-slate-100 h-9 rounded-md px-3"
                onClick={handleSaveClick}
              >
                Save
              </button> */}
              <button onClick={handleSaveClick} style={{ width: '48px', height: '48px', padding: '10px', border: 'none', background: 'none', cursor: 'pointer' }} >
                <FaRegSave style={{width: '100%', height: '100%'}} />
              </button>
              {/* <button
                className="inline-flex items-center justify-center text-sm font-medium border bg-background hover:bg-slate-100 h-9 rounded-md px-3"
                onClick={handleCancelClick}
              >
                Cancel
              </button> */}
              <button onClick={handleCancelClick} style={{ width: '48px', height: '48px', padding: '10px', border: 'none', background: 'none', cursor: 'pointer' }} >
                <ImCancelCircle style={{width: '100%', height: '100%'}} />
              </button>
            </>
          ) : (
            <>
              {/* <button
                className="inline-flex items-center justify-center text-sm font-medium border bg-background hover:bg-slate-100 h-9 rounded-md px-3"
                onClick={handleEditClick}
              >
                Edit
              </button> */}
              <button onClick={handleEditClick} style={{ width: '48px', height: '48px', padding: '10px', border: 'none', background: 'none', cursor: 'pointer' }} >
                <CiEdit style={{width: '100%', height: '100%'}} />
              </button>
              {/* <button
                className="inline-flex items-center justify-center text-sm font-medium border bg-background hover:bg-slate-100 h-9 rounded-md px-3"
                type="button"
                onClick={() => deleteRecord(record._id)}
              >
                Delete
              </button> */}
              <button onClick={() => deleteRecord(record._id)} style={{ width: '48px', height: '48px', padding: '10px', border: 'none', background: 'none', cursor: 'pointer' }} >
                <RiDeleteBinLine style={{width: '100%', height: '100%'}} />
              </button>
             
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default Record;