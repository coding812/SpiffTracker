import React, { useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';

import {toast} from 'react-toastify';
import {BaseUrl} from './BaseUrl';
import { motion } from 'framer-motion';

const PasswordReset = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    let token = useParams();
    

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        let response = await fetch(`${BaseUrl}/users/password-reset/${token.token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });
        if (response.status === 204) {
            
            toast.success('Password reset successfully');
            navigate('/login');
        } 
        else {
            console.log(response);
            toast.error('Password reset failed');
        }
        setPassword('');
        setConfirmPassword('');
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
            Enter your new password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm  h-2/5 p-6 bg-white bg-opacity-25 backdrop-blur-lg rounded-lg drop-shadow-lg">
            <form className=" " onSubmit={handleSubmit}>
                <div className="mb-4 ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        New Password
                    </label>
                    <input
                        className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        id="password"
                        type="password"
                        placeholder="Enter your new password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className=" w-full bg-indigo-600 hover:bg-indigo-500 text-white h-9 rounded-md px-3 "
                        type="submit"
                    >
                        Reset Password
                    </button>
                </div>
            </form>
        </div>
        </motion.div>
    );
};

export default PasswordReset;