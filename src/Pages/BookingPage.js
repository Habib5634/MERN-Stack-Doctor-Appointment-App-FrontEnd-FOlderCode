import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../Redux/Features/AlertSlice'
import { message } from "antd";
// import moment from "moment";

const BookingPage = () => {
    const { user } = useSelector((state) => state.user);
    const params = useParams();
    const [doctors, setDoctors] = useState([]);
    const [date, setDate] = useState("");
    const [time, setTime] = useState();
    const [isAvailable, setIsAvailable] = useState(false);
    const dispatch = useDispatch();
    // login user data
    const getUserData = async () => {
        try {
            const res = await axios.post(
                "/api/v1/doctor/getDoctorById",
                { doctorId: params.doctorId },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("Token"),
                    },
                }
            );
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    // ============ handle availiblity
    const handleAvailability = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(
                "/api/v1/user/booking-availbility",
                { doctorId: params.doctorId, date, time },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("Token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                setIsAvailable(true);
                console.log(isAvailable);
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };
    // =============== booking func
    const handleBooking = async () => {
        try {
            setIsAvailable(true);
            if (!date && !time) {
                return alert("Date & Time Required");
            }
            dispatch(showLoading());
            const res = await axios.post(
                "/api/v1/user/book-appointment",
                {
                    doctorId: params.doctorId,
                    userId: user._id,
                    doctorInfo: doctors,
                    userInfo: user,
                    date: date,
                    time: time,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("Token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };

    useEffect(() => {
        getUserData();
        //eslint-disable-next-line
    }, []);
    return (
        <Layout>
            <h3>Booking Page</h3>
            <div className="container mx-auto px-4 py-2">
                {doctors && (
                    <div className="bg-white rounded-lg shadow-md px-6 py-4">
                        <h2 className="text-xl font-bold mb-2">
                            Dr. {doctors.firstName} {doctors.lastName}
                        </h2>
                        <p className="text-sm mb-2">
                            <b>Fees Per Consultation:</b> ${doctors.feesPerConsultation}
                        </p>
                        <p className="text-sm mb-2">
                            <b>Availability:</b> {doctors.startTime} - {doctors.endTime}
                        </p>
                        <div className="flex flex-col w-64">
                            <label htmlFor="date" className="text-sm font-medium mb-1">
                                Date:
                            </label>
                            <input
                                type="date"
                                id="date"
                                className="m-2 p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                required
                            />

                            <label htmlFor="time" className="text-sm font-medium mb-1">
                                Time:
                            </label>
                            <input
                                type="time"
                                id="time"
                                className="m-2 p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={time}
                                onChange={(event) => setTime(event.target.value)}
                                required
                            />

                            <button
                                className="btn btn-primary mt-4 px-4 py-2 rounded-md shadow-sm"
                                onClick={handleAvailability}
                            >
                                Check Availability
                            </button>

                            <button
                                className="btn btn-dark mt-4 px-4 py-2 rounded-md shadow-sm"
                                onClick={handleBooking}
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default BookingPage;