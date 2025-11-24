import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { BaseUrl } from './BaseUrl';

// FRAMER MOTION ANIMATION
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.1,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Record() {
  const userState = useSelector((state) => state.userState);
  const companyId = userState.user ? userState.user.companyId : null;
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (userState.user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [userState.user]);

  useEffect(() => {
    console.log("loggedIn updated:", loggedIn);
  }, [loggedIn]);

  // State to hold the form data
  const [form, setForm] = useState({
    employeeName: "",
    companyId: "",
    dateOfSale: new Date().toISOString().split("T")[0],
    jobCompleted: new Date().toISOString().split("T")[0],
    customerName: "",
    workOrder: "",
    saleDescription: "",
    saleAmount: "",
    expectedCommission: "",
    regularHours: "",
    bidTime: ""
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  // Prefill form.companyId from userState.user when user logs in (store as string so letters show)
  useEffect(() => {
    if (userState.user && userState.user.companyId !== undefined && userState.user.companyId !== null) {
      setForm(prev => ({ ...prev, companyId: String(userState.user.companyId) }));
    }
  }, [userState.user]);

  // Check if we are adding a new record or editing an existing one
  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(
        `${BaseUrl}/record/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      // ensure companyId is a string so input displays correctly
      setForm({
        ...record,
        companyId: record.companyId !== undefined && record.companyId !== null ? String(record.companyId) : ""
      });
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const sale = { ...form };
    try {
      let response;
      if (isNew) {
        // if we are adding a new record we will POST to /record.
        response = await fetch(`${BaseUrl}/record`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sale),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      toast.success("Sale information saved successfully!");
    }
    catch (error) {
      console.error('A problem occurred adding or updating a record: ', error);
    }
    finally {
      setForm({
        employeeName: "",
        companyId: "",
        dateOfSale: "",
        jobCompleted: "",
        customerName: "",
        workOrder: "",
        saleDescription: "",
        saleAmount: "",
        expectedCommission: "",
        regularHours: "",
        bidTime: ""
      });
      if (loggedIn) {
        navigate("/admin");
      }
      else {
        navigate("/");
      }
    }
  }

  return (
    <>
      <motion.div
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}>

      </motion.div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible">

        <div className="flex flex-col items-center justify-center">
          {companyId === null ?
          <h1 className="h-16 bg-muted text-black text-2xl font-semibold">Enter Your Sale Information</h1> :
            <h1 className="h-16 bg-muted text-black text-2xl font-semibold">Entering Sale for Company Id - {companyId}</h1> 
            
          }
          <form
            onSubmit={onSubmit}
            className="flex flex-col p-8 border rounded-lg overflow-hidden  w-full sm:w-3/4 md:w-1/2 lg:w-1/4 items-center justify-center  bg-white bg-opacity-25 backdrop-blur-lg drop-shadow-lg "
          >
            <div className="flex w-full grid-cols-1 gap-x-8 gap-y-10 pb-2  justify-center items-center ">
              <div className="flex-col w-full grid-cols-1 gap-x-4 gap-y-6  ">
                {/* EMPLOYEE NAME */}
                <motion.div variants={item}>
                  <div className="">
                    <label
                      htmlFor="employeeName"
                      className="block text-sm font-medium leading-6 text-slate-900"
                    >
                      Employee Name
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md  ">
                        <input
                          type="text"
                          name="employeeName"
                          id="employeeName"
                          required
                          className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[...]

                          placeholder="First and Last"
                          value={form.employeeName}
                          onChange={(e) => updateForm({ employeeName: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
                {/* COMPANY ID NUMBER */}
                <motion.div variants={item}>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="companyId"
                      className="block text-sm font-medium leading-6 text-slate-900"
                    >
                      Company ID Number
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                        <input
                          readOnly={loggedIn}
                          type="text"
                          name="companyId"
                          id="companyId"
                          required
                          className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[...]
                          placeholder="Company ID Number"
                          {/* value={form.companyId} */}
                          value={loggedIn && userState.user ? String(userState.user.companyId) : form.companyId}
                          onChange={(e) => updateForm({ companyId: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
                {/* DATE OF SALE */}
                <motion.div variants={item}>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="dateOfSale"
                      className="block text-sm font-medium leading-6 text-slate-900"
                    >
                      Date of Sale
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                        <input
                          type="date"
                          name="dateOfSale"
                          id="dateOfSale"
                          required
                          className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[...]
                          value={form.dateOfSale}
                          onChange={(e) => updateForm({ dateOfSale: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
                {/* JOB COMPLETED */}
                <motion.div variants={item}>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="jobCompleted"
                      className="block text-sm font-medium leading-6 text-slate-900"
                    >
                      Job Completed
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                        <input
                          type="date"
                          name="jobCompleted"
                          id="jobCompleted"
                          required
                          className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[...]
                          value={form.jobCompleted}
                          onChange={(e) => updateForm({ jobCompleted: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
                {/* CUSTOMER NAME */}
                <motion.div variants={item}>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="customerName"
                      className="block text-sm font-medium leading-6 text-slate-900"
                    >
                      Customer Name
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                        <input
                          type="text"
                          name="customerName"
                          id="customerName"
                          required
                          className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[...]
                          placeholder="First and Last"
                          value={form.customerName}
                          onChange={(e) => updateForm({ customerName: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
                {/* WORK ORDER / INVOICE # */}
                <motion.div variants={item}>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="workOrder"
                      className="block text-sm font-medium leading-6 text-slate-900"
                    >
                      Work Order / Invoice #
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                        <input
                          type="text"
                          name="workOrder"
                          id="workOrder"
                          required
                          className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[...]
                          placeholder="Work Order or Invoice #"
                          value={form.workOrder}
                          onChange={(e) => updateForm({ workOrder: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
                {/* SALE DESCRIPION */}
                <motion.div variants={item}>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="saleDescription"
                      className="block text-sm font-medium leading-6 text-slate-900"
                    >
                      Sale Description
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                        <input
                          type="text"
                          name="saleDescription"
                          id="saleDescription"
                          required
                          className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[...]
                          placeholder=" Brief Sale Description"
                          value={form.saleDescription}
                          onChange={(e) => updateForm({ saleDescription: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
                {/* SALE AMOUNT */}
                <motion.div variants={item}>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="saleAmount"
                      className="block text-sm font-medium leading-6 text-slate-900"
                    >
                      Sale Amount
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                        <input
                          type="text"
                          name="saleAmount"
                          id="saleAmount"
                          required
                          className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[...]
                          placeholder="Sale Amount"
                          value={form.saleAmount}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (!isNaN(value)) {
                              updateForm({ saleAmount: value });
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
                {/* EXPECTED COMMISSION */}
                <motion.div variants={item}>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="expectedCommission"
                      className="block text-sm font-medium leading-6 text-slate-900"
                    >
                      Expected Commission
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                        <input
                          type="text"
                          name="expectedCommission"
                          id="expectedCommission"
                          required
                          className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[...]
                          placeholder="Expected Commission"
                          value={form.expectedCommission}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (!isNaN(value)) {
                              updateForm({ expectedCommission: value });
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
                {/* REGULAR HOURS*/}
                <motion.div variants={item}>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="regularHours"
                      className="block text-sm font-medium leading-6 text-slate-900"
                    >
                      Regular Hours
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                        <input
                          type="text"
                          name="regularHours"
                          id="regularHours"
                          required
                          className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[...]
                          placeholder="Regular Hours"
                          value={form.regularHours}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (!isNaN(value)) {
                              updateForm({ regularHours: value });
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
                {/* BID TIME */}
                <motion.div variants={item}>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="bidTime"
                      className="block text-sm font-medium leading-6 text-slate-900"
                    >
                      Bid Time
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                        <input
                          type="text"
                          name="bidTime"
                          id="bidTime"
                          required
                          className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[...]
                          placeholder="Bid Time"
                          value={form.bidTime}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (!isNaN(value)) {
                              updateForm({ bidTime: value });
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            {/* SUBMIT BUTTON */}
            <motion.div variants={item}>
              <input
                type="submit"
                value="Save Sale Information"
                className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focu[...]
              />
            </motion.div>
          </form>
        </div>
      </motion.div>
    </>
  );
}
