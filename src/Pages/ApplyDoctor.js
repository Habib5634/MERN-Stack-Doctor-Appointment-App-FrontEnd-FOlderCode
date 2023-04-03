import React from 'react'
import Layout from '../Components/Layout'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../Redux/Features/AlertSlice';
const ApplyDoctor = () => {
    //get current user
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        website: "",
        address: "",
        specialization: "",
        experience: "",
        feesPerConsultation: "",
        startTime: "",
        endTime: ""
    });
    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (event) => {
        event.preventDefault(); // prevent the default form submission behavior

        try {
            dispatch(showLoading())
            const { data } = await axios.post('./api/v1/user/apply-doctor', {
                firstName: inputs.firstName,
                lastName: inputs.lastName,
                phone: inputs.phone,
                email: inputs.email,
                website: inputs.website,
                address: inputs.address,
                specialization: inputs.specialization,
                experience: inputs.experience,
                feesPerConsultation: inputs.feesPerConsultation,
                startTime: inputs.startTime,
                endTime: inputs.endTime,
                userId: user._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`
                }
            })
            dispatch(hideLoading())
            if (data.success) {

                navigate("/")
            }

        } catch (error) {
            dispatch(hideLoading())
            console.log(error)

        }
    };
    return (

        <Layout>
            <div className="h-screen bg-cover bg-center content-center">
                <form onSubmit={handleSubmit} className=" p-6 rounded-md lg:w-3/4 md:w-2/4 md:pt-6  mx-auto bg-gray-200 ">

                    <div className="text-center w-full">
                        <h1 className="pt-8 text-4xl font-bold text-gray-700">
                            APPLY<span className="text-red-500"> FOR DOCTOR</span>
                        </h1>
                        <div className="border-b-4 border-red-500 w-28 mx-auto pt-3"></div>
                        <div className="border-b-4 border-red-500 w-40 mx-auto pt-1 "></div>
                    </div>
                    <h1 className='text-2xl text-red-500 pb-2'>Personal Details:</h1>
                    <div className="mb-4 flex flex-row space-x-8 items-center">

                        <div className='w-2/4'>
                            <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                className="shadow w-full appearance-none border rounded h-12 py-2 px-3 text-gray-700"
                                id="firstName"
                                type="text"
                                name="firstName"
                                required
                                value={inputs.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='w-2/4'>
                            <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                className="shadow w-full appearance-none border rounded h-12 py-2 px-3 text-gray-700"
                                id="lastName"
                                type="text"
                                name="lastName"
                                required
                                value={inputs.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4 flex flex-row space-x-8 items-center">
                        <div className='w-2/4'>
                            <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="firstName">
                                Phone Number
                            </label>
                            <input
                                className="shadow w-full appearance-none border rounded h-12 py-2 px-3 text-gray-700"
                                id="phone"
                                type="text"
                                name="phone"
                                required
                                value={inputs.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='w-2/4'>
                            <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="lastName">
                                Email
                            </label>
                            <input
                                className="shadow w-full appearance-none border rounded h-12 py-2 px-3 text-gray-700"
                                id="email"
                                type="email"
                                name="email"
                                required
                                value={inputs.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4 flex flex-row space-x-8 items-center">
                        <div className='w-2/4'>
                            <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="firstName">
                                Website
                            </label>
                            <input
                                className="shadow w-full appearance-none border rounded h-12 py-2 px-3 text-gray-700"
                                id="website"
                                type="text"
                                name="website"
                                value={inputs.website}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='w-2/4'>
                            <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="lastName">
                                Address
                            </label>
                            <input
                                className="shadow w-full appearance-none border rounded h-12 py-2 px-3 text-gray-700"
                                id="address"
                                type="text"
                                name="address"
                                required
                                value={inputs.address}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <h1 className='text-2xl text-red-500 pb-2'>Professional Details Details: </h1>
                    <div className="mb-4 flex flex-row space-x-8 items-center">

                        <div className='w-2/4'>
                            <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="firstName">
                                Specialization
                            </label>
                            <input
                                className="shadow w-full appearance-none border rounded h-12 py-2 px-3 text-gray-700"
                                id="specialization"
                                type="text"
                                name="specialization"
                                required
                                value={inputs.specialization}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='w-2/4'>
                            <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="lastName">
                                Experience
                            </label>
                            <input
                                className="shadow w-full appearance-none border rounded h-12 py-2 px-3 text-gray-700"
                                id="experience"
                                type="text"
                                name="experience"
                                required
                                value={inputs.experience}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4 flex flex-row space-x-8 items-center">
                        <div className='w-2/4'>
                            <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="firstName">
                                Fees Per Consultation
                            </label>
                            <input
                                className="shadow w-full appearance-none border rounded h-12 py-2 px-3 text-gray-700"
                                id="feesPerConsultation"
                                type="number"
                                name="feesPerConsultation"
                                required
                                value={inputs.feesPerConsultation}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='w-2/4'>
                            <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="lastName">
                                Timing Start and End
                            </label>
                            <div className="flex justify-between">
                                <input
                                    className="shadow appearance-none border rounded h-12 py-2 px-3 text-gray-700 w-2/4 mr-4"

                                    id="startTime"
                                    type="time"
                                    name="startTime"
                                    required
                                    value={inputs.startTime}
                                    onChange={handleChange}
                                    min="08:00"
                                    max="18:00"
                                />
                                <input
                                    className="shadow appearance-none border rounded h-12 py-2 px-3 text-gray-700 w-2/4"
                                    id="endTime"
                                    type="time"
                                    name="endTime"
                                    required
                                    value={inputs.endTime}
                                    onChange={handleChange}
                                    min="08:00"
                                    max="18:00"
                                />
                            </div>
                        </div>
                    </div>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4" type="submit">
                        Apply
                    </button><br />

                </form>
            </div>
        </Layout>

    )
}

export default ApplyDoctor