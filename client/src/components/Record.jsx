import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import  BaseUrl  from './BaseUrl';

export default function Record() {
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState.token);

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (userState) {
        setLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

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
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

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
      setForm(record);
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
        expectedCommission: ""
      });
      if (loggedIn) {
        navigate("/admin");
      }
      else {
        navigate("/");
      }
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Enter Your Sale Information</h3>
      <div className="flex flex-col items-center justify-center ">
        <form
          onSubmit={onSubmit}
          className="flex flex-col  border rounded-lg overflow-hidden p-2 w-full sm:w-3/4 md:w-1/2 lg:w-1/4 items-center justify-center "
        >
          <div className="flex w-full grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12  justify-center items-center ">
            <div className="flex-col w-full grid-cols-1 gap-x-4 gap-y-6  ">
              {/* EMPLOYEE NAME */}
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
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="First and Last"
                      value={form.employeeName}
                      onChange={(e) => updateForm({ employeeName: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              {/* COMPANY ID NUMBER */}
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
                      type="number"
                      name="companyId"
                      id="companyId"
                      required
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Company ID Number"
                      value={form.companyId}
                      onChange={(e) => updateForm({ companyId: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              {/* DATE OF SALE */}
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
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      value={form.dateOfSale}
                      onChange={(e) => updateForm({ dateOfSale: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              {/* JOB COMPLETED */}
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
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      value={form.jobCompleted}
                      onChange={(e) => updateForm({ jobCompleted: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              {/* CUSTOMER NAME */}
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
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="First and Last"
                      value={form.customerName}
                      onChange={(e) => updateForm({ customerName: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              {/* WORK ORDER / INVOICE # */}
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
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Work Order or Invoice #"
                      value={form.workOrder}
                      onChange={(e) => updateForm({ workOrder: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              {/* SALE DESCRIPION */}
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
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder=" Brief Sale Description"
                      value={form.saleDescription}
                      onChange={(e) => updateForm({ saleDescription: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              {/* SALE AMOUNT */}
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
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
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
              {/* EXPECTED COMMISSION */}
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
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
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
            </div>
          </div>
          <input
            type="submit"
            value="Save Sale Information"
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-indigo-600 hover:bg-indigo-500 text-white hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
          />
        </form>
      </div>
    </>
  );
}