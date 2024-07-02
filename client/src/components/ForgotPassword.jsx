import React, { useState } from 'react';
import {BaseUrl} from './BaseUrl';
import { toast } from "react-toastify";


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
        <div className="flex mt-48 justify-center h-screen">
            <div className="w-96">
                <h2 className="text-2xl font-bold mb-4">Password Reset</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        </div>
    );
};

export default ForgotPassword;