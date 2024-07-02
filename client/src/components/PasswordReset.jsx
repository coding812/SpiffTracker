import React, { useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';

import {toast} from 'react-toastify';
import {BaseUrl} from './BaseUrl';

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
        <div className="flex justify-center items-center h-screen">
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        New Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
    );
};

export default PasswordReset;