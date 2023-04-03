import { FaHouseUser, FaCalendarAlt, FaUserAlt, FaUserMd, FaLongArrowAltRight } from 'react-icons/fa';

export const userMenu = [
    {
        name: "Home",
        path: "/",
        icon: <FaHouseUser />
    },
    {
        name: "Appointment",
        path: "/appointments",
        icon: <FaCalendarAlt />
    },
    {
        name: "Apply Doctors",
        path: "/apply-doctors",
        icon: <FaUserMd />
    },
    {
        name: "Profile",
        path: "/profile",
        icon: <FaUserAlt />
    },

]


// admin menubar
export const adminrMenu = [
    {
        name: "Home",
        path: "/",
        icon: <FaHouseUser />
    },

    {
        name: "Doctors",
        path: "/admin/doctors",
        icon: <FaUserMd />
    },
    {
        name: "Users",
        path: "/admin/users",
        icon: <FaUserAlt />
    },
    {
        name: "Profie",
        path: "/profile",
        icon: <FaUserAlt />
    },

]

