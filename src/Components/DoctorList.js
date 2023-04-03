import React from 'react'
import { useNavigate } from 'react-router-dom';

const DoctorList = ({ doctor }) => {
    const navigate = useNavigate();
    return (
        <div className="w-full md:w-1/2 lg:w-1/2 p-2">
            <div className="bg-white rounded-lg shadow-lg">
                <div className="px-6 py-4">
                    <h2 className="text-2xl font-bold text-red-500 mb-2">
                        Dr. {doctor.firstName} {doctor.lastName}
                    </h2>
                    <p className="text-lg  mb-2">
                        <b>Specialization:</b> {doctor.specialization}
                    </p>
                    <p className="text-lg mb-2">
                        <b>Experience:</b> {doctor.experience} years
                    </p>
                    <p className="text-lg mb-2">
                        <b>Fees Per Consultation:</b> ${doctor.feesPerConsultation}
                    </p>
                    <p className="text-lg mb-2">
                        <b>Availability:</b> {doctor.startTime} - {doctor.endTime}
                    </p>
                    <button
                        className="bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
                    >
                        Book Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorList