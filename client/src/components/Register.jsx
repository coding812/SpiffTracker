import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {BaseUrl}  from './BaseUrl';

const Register = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        companyId: "",
    });
    const [isNew, setIsNew] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.id) {
            fetch(`${BaseUrl}/user/register/${params.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setForm(data);
                    setIsNew(false);
                });
        }
    }, [params.id]);

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        const user = { ...form };
        
        if (user.password !== user.password2) {
            toast.error("Passwords do not match. Please try again.");
            return;
        }
        try {
            let response;
            if (isNew) {
                response = await fetch(`${BaseUrl}/users/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                });

                if (response.ok) {
                    // Record added successfully
                    toast.success("New user added successfully. Please login to continue.");
                    navigate("/login");
                } 
                else {
                    const data = await response.json();
                    console.log(data.error);

                    if (data.error === "Email already exists") {
                        toast.error("Email already exists. Please enter a different email.");
                    } 
                    else if (data.error === "Company already exists") {
                        toast.error("Company ID already exists. Please enter a different company ID.");
                    } 
                    else if (data.error === "User and company already exist") {
                        toast.error("User and company already exist. Please enter a different email and company ID.");
                    }
                }
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } 
        catch (error) {
            console.error('A problem occurred adding or updating a user: ', error);
        } 
        // finally {
        //     setForm({
        //         firstName: "",
        //         lastName: "",
        //         email: "",
        //         password: "",
        //         companyId: "",
        //     });
        // }
    }

    return (
        <>
            <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.45 }}
            className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Register your account
                    </h2>
                </div>
                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm w-1/4 h-2/5 p-6 bg-white bg-opacity-25 backdrop-blur-lg rounded-lg drop-shadow-lg">
                        <form className="space-y-2" action="#" method="POST" onSubmit={onSubmit}>
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="first-name"
                                        name="first-name"
                                        type="text"
                                        value={form.firstName}
                                        onChange={(e) => updateForm({ firstName: e.target.value })}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="last-name"
                                        name="last-name"
                                        type="text"
                                        value={form.lastName}
                                        onChange={(e) => updateForm({ lastName: e.target.value })}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => updateForm({ email: e.target.value })}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={form.password}
                                        onChange={(e) => updateForm({ password: e.target.value })}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={form.password2}
                                        onChange={(e) => updateForm({ password2: e.target.value })}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="company-id" className="block text-sm font-medium leading-6 text-gray-900">
                                        Company ID
                                    </label>
                                    <p className="mt-10 text-center text-sm text-gray-500">
                                        This will be the unique identifier for your company. Please enter the company ID provided by your manager.
                                    </p>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="company-id"
                                        name="company-id"
                                        type="text"
                                        value={form.companyId}
                                        onChange={(e) => updateForm({ companyId: e.target.value })}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Register
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already a member?{' '}
                            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Login here.
                            </a>
                        </p>
                    </div>
                </div>
            </motion.div>
        </>
    );

};

            export default Register;