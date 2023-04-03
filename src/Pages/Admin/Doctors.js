import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import axios from "axios"
const Doctors = () => {

    const [doctors, setDoctors] = useState([])

    // get Users
    const getDoctors = async () => {
        try {
            const res = await axios.get('/api/v1/admin/getAllDoctors', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`
                }
            })
            if (res.data.success) {
                setDoctors(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // handle account
    const handleAccountStatus = async (record, status) => {
        try {
            const res = await axios.post(
                "/api/v1/admin/changeAccountStatus",
                { doctorId: record._id, userId: record.userId, status: status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("Token")}`,
                    },
                }
            );
            if (res.data.success) {
                console.log(res.data.message);
                window.location.reload();
            }
        } catch (error) {
            console.log("Something Went Wrong");
        }
    };
    useEffect(() => {
        getDoctors()
    }, [])
    return (
        <Layout>
            <h1 className="text-center m-3">All Doctors</h1>
            <div className="w-full px-4 mb-4 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200 bg-gray-50">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200 bg-gray-50">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200 bg-gray-50">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200 bg-gray-50">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {doctors.map((doctor) => (
                            <tr key={doctor._id}>
                                <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{doctor.firstName} {doctor.lastName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{doctor.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{doctor.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                                    <div className="flex items-center">
                                        {doctor.status === "Pending" ? (
                                            <button className="px-4 py-2 mr-2 text-white bg-green-500 rounded hover:bg-green-600 focus:bg-green-700 focus:outline-none"
                                                onClick={() => handleAccountStatus(doctor, "approved")}
                                            >Approve</button>
                                        ) : (
                                            <button className="px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-600 focus:bg-red-700 focus:outline-none">Reject</button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Doctors