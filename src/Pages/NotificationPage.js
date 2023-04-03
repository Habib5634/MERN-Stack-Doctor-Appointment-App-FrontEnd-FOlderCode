import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from '../Redux/Features/AlertSlice';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from '../Components/Layout'

const NotificationPage = () => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("unread");

    //   handle read notification
    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(
                "/api/v1/user/get-all-notification",
                {
                    userId: user._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("Token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                console.log(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            console.log("somthing went wrong");
        }
    };

    // delete notifications
    const handleDeleteAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(
                "/api/v1/user/delete-all-notification",
                { userId: user._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("Token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                console.log(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            console.log("Somthing Went Wrong In Ntifications");
        }
    };
    return (
        <Layout>
            <div className="w-full flex flex-col items-center">
                <h4 className="p-3 text-center font-bold text-lg">
                    Notification Page
                </h4>

                <div className="w-full flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
                    <div className="flex items-center space-x-2">
                        <button
                            className={`p-2 hover:text-blue-500 ${activeTab === 'unread' ? 'font-bold text-blue-500' : ''}`}
                            onClick={() => setActiveTab('unread')}
                        >
                            Unread
                        </button>
                        <button
                            className={`p-2 hover:text-blue-500 ${activeTab === 'read' ? 'font-bold text-blue-500' : ''}`}
                            onClick={() => setActiveTab('read')}
                        >
                            Read
                        </button>
                    </div>
                    {activeTab === 'unread' && (
                        <button
                            className="p-2 text-blue-500"
                            onClick={handleMarkAllRead}
                        >
                            Mark All Read
                        </button>
                    )}
                    {activeTab === 'read' && (
                        <button
                            className="p-2 text-blue-500"
                            onClick={handleDeleteAllRead}
                        >
                            Delete All Read
                        </button>
                    )}
                </div>

                <div className={`w-full grid grid-cols-1 gap-4 ${activeTab === 'unread' ? '' : 'hidden'}`}>
                    {user?.notification.map((notificationMgs) => (
                        <div
                            className="p-4 bg-white rounded-md shadow-md cursor-pointer"
                            key={notificationMgs.id}
                            onClick={() => navigate(notificationMgs.onClickPath)}
                        >
                            {notificationMgs.message}
                        </div>
                    ))}
                </div>

                <div className={`w-full grid grid-cols-1 gap-4 ${activeTab === 'read' ? '' : 'hidden'}`}>
                    {user?.seenNotification.map((notification) => (
                        <div
                            className="p-4 bg-white rounded-md shadow-md cursor-pointer"
                            key={notification.id}
                            onClick={() => navigate(notification.onClickPath)}
                        >
                            {notification.message}
                        </div>
                    ))}
                </div>

                {/* <div className="w-full mt-8 flex justify-end">
                    {activeTab === 'read' && (
                        <button
                            className="p-2 text-blue-500"
                            onClick={handleDeleteAllRead}
                        >
                            Delete All Read
                        </button>
                    )}
                </div> */}
            </div>
        </Layout>
    )
}

export default NotificationPage