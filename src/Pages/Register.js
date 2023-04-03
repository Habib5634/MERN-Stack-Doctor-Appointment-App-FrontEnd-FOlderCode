import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios"
import { message } from "antd";
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../Redux/Features/AlertSlice';
function RegisterForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (event) => {
        event.preventDefault(); // prevent the default form submission behavior

        try {
            dispatch(showLoading())
            const { data } = await axios.post('./api/v1/user/register', { name: inputs.name, email: inputs.email, password: inputs.password })
            dispatch(hideLoading())
            if (data.success) {
                message.success("user registered successfully");
                navigate("/login")
            }

        } catch (error) {
            dispatch(hideLoading())
            if (error.response.status === 409 && error.response.data.message === 'User with this email already exists') {
                message.error("User with this email is already registered")
            } else {
                message.error("An error occurred. Please try again later")
            }
        }
    };

    return (
        <>
            <div className="h-screen bg-cover bg-center content-center">
                <form onSubmit={handleSubmit} className=" p-6 rounded-md lg:w-3/4 md:w-2/4 md:pt-6  mx-auto bg-gray-200 ">

                    <div className="text-center w-full">
                        <h1 className="pt-8 text-4xl font-bold text-gray-700">
                            REGISTRATION<span className="text-red-500"> FORM</span>
                        </h1>
                        <div className="border-b-4 border-red-500 w-28 mx-auto pt-3"></div>
                        <div className="border-b-4 border-red-500 w-40 mx-auto pt-1 "></div>
                    </div>

                    <div className="mb-4 ">
                        <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-3/4 h-12 mx-auto py-2 px-3 text-gray-700  "
                            id="name"
                            type="text"
                            name="name"
                            required
                            value={inputs.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-3/4 h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            name="email"
                            type="email"
                            value={inputs.email}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-3/4 h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            name="password"
                            type="password"
                            value={inputs.password}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4" type="submit">
                        Register
                    </button><br />
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-gray-200  text-blue-800 font-semibold py-6 rounded ">
                        Already Registered?
                    </button>
                </form>
            </div>
        </>
    );
}

export default RegisterForm;