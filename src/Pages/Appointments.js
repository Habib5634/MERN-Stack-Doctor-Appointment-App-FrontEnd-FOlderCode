import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import axios from 'axios'
const Appointments = () => {

    const [appointments, setAppointments] = useState([])
    const getAppointents = async () => {
        try {
            const res = await axios.get('/api/v1/user/user-appointments', {
                headers: {
                    Authorization: ` Bearer ${localStorage.getItem("Token")}`
                }
            })
            if (res.data.success) {
                setAppointments(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => { getAppointents() }, [])

    return (
        <Layout>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="text-center w-full">
                    <h1 className="pt-8 text-4xl font-bold text-gray-700">
                        MY<span className="text-red-500"> APPOINTMENTS LIST</span>
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
                            {appointments.map((appointment) => (
                                <tr key={appointment._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appointment._id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(appointment.date + " " + appointment.time).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export default Appointments