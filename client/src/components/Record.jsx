import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Record() {
  const [form, setForm] = useState({
    employee_name: "",
    company_id: "",
    date_of_sale: "",
    job_completed: "",
    customer_name: "",
    work_order: "",
    sale_description: "",
    sale_amount: "",
    expected_commission: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/record/${params.id.toString()}`
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
        response = await fetch("http://localhost:5050/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sale),
        });
      } else {
        // if we are updating a record we will PATCH to /record/:id.
        response = await fetch(`http://localhost:5050/record/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sale),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred adding or updating a record: ', error);
    } finally {
      setForm({ 
        employee_name: "", 
        company_id: "", 
        date_of_sale: "", 
        job_completed: "", 
        customer_name: "", 
        work_order: "", 
        sale_description: "", 
        sale_amount: "", 
        expected_commission: ""});
      navigate("/");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Enter Your Sale Information</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            {/* EMPLOYEE NAME */}
            <div className="sm:col-span-4">
              <label
                htmlFor="employee_name"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Employee Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="employee_name"
                    id="employee_name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="First Last"
                    value={form.employee_name}
                    onChange={(e) => updateForm({ employee_name: e.target.value })}
                  />
                </div>
              </div>
            </div>
            {/* COMPANY ID NUMBER */}
            <div className="sm:col-span-4">
              <label
                htmlFor="company_id"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Company ID Number
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                  <input
                    type="number"
                    name="company_id"
                    id="company_id"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Company ID Number"
                    value={form.company_id}
                    onChange={(e) => updateForm({ company_id: e.target.value })}
                  />
                </div>
              </div>
            </div>
            {/* DATE OF SALE */}
            <div className="sm:col-span-4">
              <label
                htmlFor="date_of_sale"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Date of Sale
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                  <input
                    type="date"
                    name="date_of_sale"
                    id="date_of_sale"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Developer Advocate"
                    value={form.date_of_sale}
                    onChange={(e) => updateForm({ date_of_sale: e.target.value })}
                  />
                </div>
              </div>
            </div>
            {/* JOB COMPLETED */}
            <div className="sm:col-span-4">
              <label
                htmlFor="job_completed"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Job Completed
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                  <input
                    type="date"
                    name="job_completed"
                    id="job_completed"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=""
                    value={form.job_completed}
                    onChange={(e) => updateForm({ job_completed: e.target.value })}
                  />
                </div>
              </div>
            </div>
            {/* CUSTOMER NAME */}
            <div className="sm:col-span-4">
              <label
                htmlFor="customer_name"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Customer Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                  <input
                    type="text"
                    name="customer_name"
                    id="customer_name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="First Last"
                    value={form.customer_name}
                    onChange={(e) => updateForm({ customer_name: e.target.value })}
                  />
                </div>
              </div>
            </div>
            {/* WORK ORDER / INVOICE # */}
            <div className="sm:col-span-4">
              <label
                htmlFor="work_order"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Work Order / Invoice #
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                  <input
                    type="text"
                    name="work_order"
                    id="work_order"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Work Order or Invoice Number"
                    value={form.work_order}
                    onChange={(e) => updateForm({ work_order: e.target.value })}
                  />
                </div>
              </div>
            </div>
            {/* SALE DESCRIPION */}
            <div className="sm:col-span-4">
              <label
                htmlFor="sale_description"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Sale Description
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                  <input
                    type="text"
                    name="sale_description"
                    id="sale_description"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Sale Description"
                    value={form.sale_description}
                    onChange={(e) => updateForm({ sale_description: e.target.value })}
                  />
                </div>
              </div>
            </div>
            {/* SALE AMOUNT */}
            <div className="sm:col-span-4">
              <label
                htmlFor="sale_amount"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Sale Amount
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                  <input
                    type="number"
                    name="sale_amount"
                    id="sale_amount"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Sale Amount"
                    value={form.sale_amount}
                    onChange={(e) => updateForm({ sale_amount: e.target.value })}
                  />
                </div>
              </div>
            </div>
            {/* EXPECTED COMMISSION */}
            <div className="sm:col-span-4">
              <label
                htmlFor="expected_commission"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Expected Commission
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-400 sm:max-w-md">
                  <input
                    type="number"
                    name="expected_commission"
                    id="expected_commission"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Expected Commission"
                    value={form.expected_commission}
                    onChange={(e) => updateForm({ expected_commission: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Save Sale Information"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}