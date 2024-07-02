import React, { useState } from 'react';
import {BaseUrl} from './BaseUrl';
import { toast } from "react-toastify";
import { motion } from 'framer-motion';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        try {
        const response = await fetch(`${BaseUrl}/users/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
            const data = await response.json();
        
            if (!response.ok) {
                if (response.status === 404) {

                    toast.error("User with that email not found");
                    return;
                }
            }
            console.log(data);
            toast.success('Password reset email sent');
        } 
        catch (error) {
            console.error('Password reset failed:', error);
            alert(`${data.message}` || 'Error resetting password');
        }
    };


    return (
        <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.45 }}

        className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Password Reset Email Request
          </h2>
        </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm  h-2/5 p-6 bg-white bg-opacity-25 backdrop-blur-lg rounded-lg drop-shadow-lg">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white h-9 rounded-md px-3 mr-3"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default ForgotPassword;