import React, { useEffect, useState } from "react";
import { NavLink , useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/slice';

import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine} from "react-icons/ri";
import { FaRegSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";

import {motion} from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.1,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

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
    
    <motion.tr 
    variants={container}
    initial="hidden"
    animate="visible"

    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
    >
      
      <motion.td 
      variants={item}
      className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
        {isEditing ? (
          <input
            className="bg-background border border-muted/50 rounded-md px-2 h-9"
            type="text"
            name="employeeName"
            value={editedRecord.employeeName}
            onChange={handleInputChange}
          />
        ) : (
          record.employeeName
        )}
      </motion.td>
      <motion.td 
      variants={item}
      className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
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
      </motion.td>
      <motion.td 
      variants={item}
      className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
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
      </motion.td>
      <motion.td 
      variants={item}
      className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
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
      </motion.td>
      <motion.td 
      variants={item}
      className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
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
      </motion.td>
      <motion.td 
      variants={item}
      className="px-4 py-4 align-middle text-sm font-medium text-muted-foreground">
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              
              <button onClick={handleSaveClick} style={{ width: '48px', height: '48px', padding: '10px', border: 'none', background: 'none', cursor: 'pointer' }} >
                <FaRegSave style={{width: '100%', height: '100%'}} />
              </button>
              
              <button onClick={handleCancelClick} style={{ width: '48px', height: '48px', padding: '10px', border: 'none', background: 'none', cursor: 'pointer' }} >
                <ImCancelCircle style={{width: '100%', height: '100%'}} />
              </button>
            </>
          ) : (
            <>
              
              <button onClick={handleEditClick} style={{ width: '48px', height: '48px', padding: '10px', border: 'none', background: 'none', cursor: 'pointer' }} >
                <CiEdit style={{width: '100%', height: '100%'}} />
              </button>
              
              <button onClick={() => deleteRecord(record._id)} style={{ width: '48px', height: '48px', padding: '10px', border: 'none', background: 'none', cursor: 'pointer' }} >
                <RiDeleteBinLine style={{width: '100%', height: '100%'}} />
              </button>
             
            </>
          )}
        </div>
      </motion.td>
    </motion.tr>
  );
};

export default Record;