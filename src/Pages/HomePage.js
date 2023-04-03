import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../Components/Layout";



import DoctorList from "../Components/DoctorList";
const HomePage = () => {
    const [doctors, setDoctors] = useState([]);

    // login user data
    const getUserData = async () => {
        try {
            const res = await axios.get(
                "/api/v1/user/getAllDoctor",

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

    useEffect(() => {
        getUserData();
    }, []);
    return (
        <Layout>
            <div className="flex flex-wrap justify-center">
                <div className="text-center w-full">
                    <h1 className="pt-8 text-4xl font-bold text-gray-700">
                        DOCTORS<span className="text-red-500"> DETAIL</span>
                    </h1>
                    <div className="border-b-4 border-red-500 w-28 mx-auto pt-3"></div>
                    <div className="border-b-4 border-red-500 w-40 mx-auto pt-1 "></div>
                </div>
                {doctors &&
                    doctors.map((doctor) => <DoctorList doctor={doctor} key={doctor._id} />)}
            </div>
        </Layout>
    );
};

export default HomePage;