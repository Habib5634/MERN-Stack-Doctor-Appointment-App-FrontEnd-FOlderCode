import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { adminrMenu, userMenu } from '../Data/Data'
import { message } from "antd";
import { FaHouseUser, FaCalendarAlt, FaUserAlt, FaLongArrowAltRight } from 'react-icons/fa';


const Layout = ({ children }) => {
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    const location = useLocation
    ///logout function
    const handleLogout = () => {
        localStorage.clear()
        message.success("Logout Successfully")
        navigate('login')
    }

    // / =================doctor Menu ===============
    const doctorMenu = [
        {
            name: "Home",
            path: "/",
            icon: <FaHouseUser />
        },
        {
            name: "Appointment",
            path: "/doctor-appointments",
            icon: <FaCalendarAlt />
        },

        {
            name: "Profile",
            path: `/doctor/profile/${user?._id}`,
            icon: <FaUserAlt />
        },

    ]
    // / =================doctor Menu ===============

    //rendering menu list 
    const SidebarMenu = user?.isAdmin ? adminrMenu : user?.isDoctor ? doctorMenu : userMenu


    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="lg:block flex-none w-64 bg-white border-r">
                <div className="p-4 bg-red-500 h-full">
                    <h1 className="text-2xl font-semibold text-white">Doc App</h1>
                    <div className='pt-4'>
                        {SidebarMenu.map(menu => {
                            const isActive = location.pathname === menu.path;
                            return (
                                <>
                                    <div className={`flex mt-1 py-2 text-xl text-white ${isActive && "bg-gray-500 text-gray-900"}`} >
                                        <i className='mt-1 mr-1'>{menu.icon}</i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                </>
                            )
                        })}
                        <div className='flex mt-1 py-2 text-xl text-white' onClick={handleLogout}>
                            <i className='mt-1 mr-1'><FaLongArrowAltRight /></i>
                            <Link to="/login">Logout</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col flex-1">
                {/* Header */}
                <div className="flex justify-end gap-1 items-center py-4 px-6 bg-white border-b">
                    <div className="relative">
                        <i className="bi bi-bell-fill" onClick={() => navigate('/notification')}>
                            {user && user.notification.length > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {user.notification.length}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            )}
                        </i>
                    </div>
                    <Link to={doctorMenu.path}>{user?.name}</Link>
                </div>

                {/* Home page */}
                <div className="flex-grow p-6">
                    <h1 className="text-xl font-semibold mb-4">{children}</h1>
                    <p className="text-gray-500">

                    </p>
                </div>
            </div>
        </div>
    )
}

export default Layout