import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import axios from 'axios'
import { message } from "antd";
const DoctorAppointments = () => {


    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try {
            const res = await axios.get("/api/v1/doctor/doctor-appointments", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            });
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAppointments();
    }, []);

    const handleStatus = async (record, status) => {
        try {
            const res = await axios.post(
                "/api/v1/doctor/update-status",
                { appointmentsId: record._id, status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("Token")}`,
                    },
                }
            );
            if (res.data.success) {
                message.success(res.data.message);
                getAppointments();
            }
        } catch (error) {
            console.log(error);
            message.error("Something Went Wrong");
        }
    };
    return (
        <Layout>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="text-center w-full">
                    <h1 className="pt-8 text-4xl font-bold text-gray-700">
                        APPOINTMENTS<span className="text-red-500"> LIST</span>
                    </h1>
                    <div className="border-b-4 border-red-500 w-28 mx-auto pt-3"></div>
                    <div className="border-b-4 border-red-500 w-40 mx-auto pt-1 "></div>
                </div>
                <div className="my-4">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date & Time
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {appointments.map((record) => (
                                <tr key={record._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record._id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(record.date + " " + record.time).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {record.status === 'pending' && (
                                            <div className='flex justify-center items-center'>
                                                <button
                                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md mr-2"
                                                    onClick={() => handleStatus(record, "approved")}
                                                >
                                                    Approved
                                                </button>
                                                <button
                                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                                                    onClick={() => handleStatus(record, "rejected")}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export default DoctorAppointments