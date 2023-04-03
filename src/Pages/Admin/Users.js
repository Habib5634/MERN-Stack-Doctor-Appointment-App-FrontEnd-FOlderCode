import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import axios from "axios"
const Users = () => {
    const [users, setUsers] = useState([])

    // get Users
    const getUsers = async () => {
        try {
            const res = await axios.get('/api/v1/admin/getAllUsers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`
                }
            })
            if (res.data.success) {
                setUsers(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUsers()
    }, [])
    return (
        <Layout> <div className="max-w-4xl mx-auto my-4">
            <h1 className="text-center text-3xl font-bold mb-4">Users List</h1>

            <div className="bg-white shadow-md rounded-md overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="border-b border-gray-300">
                            <th className="py-2 px-4 text-left">Name</th>
                            <th className="py-2 px-4 text-left">Email</th>
                            <th className="py-2 px-4 text-left">Doctor</th>
                            <th className="py-2 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b border-gray-300">
                                <td className="py-2 px-4">{user.name}</td>
                                <td className="py-2 px-4">{user.email}</td>
                                <td className="py-2 px-4">{user.isDoctor ? "Yes" : "No"}</td>
                                <td className="py-2 px-4">
                                    <button className="bg-red-500 text-white py-1 px-2 rounded-md">
                                        Block
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div></Layout>
    )
}

export default Users