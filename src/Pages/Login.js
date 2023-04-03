import React from 'react';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { message } from "antd";
import { showLoading, hideLoading } from '../Redux/Features/AlertSlice';
import axios from "axios"
function RegisterForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({

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
            const { data } = await axios.post('./api/v1/user/login', { email: inputs.email, password: inputs.password })
            window.location.reload();
            dispatch(hideLoading())
            if (data.success) {
                localStorage.setItem("Token", data.token)
                message.success("user Login successfully");
                navigate("/")
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error("this email is Not Registered");
        }
    };

    return (
        <>
            <div className="h-screen bg-cover bg-center content-center">
                <form onSubmit={handleSubmit} className=" p-6 rounded-md lg:w-3/4 md:w-2/4 md:pt-6  mx-auto bg-gray-200 ">

                    <div className="text-center w-full">
                        <h1 className="pt-8 text-4xl font-bold text-gray-700">
                            LOGIN<span className="text-red-500"> FORM</span>
                        </h1>
                        <div className="border-b-4 border-red-500 w-28 mx-auto pt-3"></div>
                        <div className="border-b-4 border-red-500 w-40 mx-auto pt-1 "></div>
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
                        Login
                    </button><br />
                    <button
                        onClick={() => navigate("/register")}
                        className="bg-gray-200  text-blue-800 font-semibold py-6 rounded ">
                        Not a user?
                    </button>
                </form>
            </div>
        </>
    );
}

export default RegisterForm;