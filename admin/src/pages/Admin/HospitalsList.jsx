// admin/src/pages/Admin/HospitalsList.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const HospitalsList = () => {
    const { aToken, backendUrl } = useContext(AdminContext);
    const [hospitals, setHospitals] = useState([]);

    const fetchHospitals = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + '/api/hospital/all',
                { headers: { aToken } }
            );
            if (data.success) {
                setHospitals(data.hospitals);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const deleteHospital = async (hospitalId) => {
        if (window.confirm('Are you sure you want to delete this hospital?')) {
            try {
                const { data } = await axios.post(
                    backendUrl + '/api/hospital/delete',
                    { hospitalId },
                    { headers: { aToken } }
                );
                if (data.success) {
                    toast.success(data.message);
                    fetchHospitals();
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    useEffect(() => {
        if (aToken) {
            fetchHospitals();
        }
    }, [aToken]);

    return (
        <div className="m-5 max-h-[90vh] overflow-y-scroll">
            <h1 className="text-lg font-medium mb-4">All Hospitals</h1>
            <div className="bg-white rounded-lg shadow-sm">
                <div className="grid grid-cols-[1fr_2fr_2fr_1fr_1fr] gap-4 p-4 border-b font-medium">
                    <p>Image</p>
                    <p>Name</p>
                    <p>Location</p>
                    <p>Doctors</p>
                    <p>Actions</p>
                </div>
                {hospitals.map((hospital) => (
                    <div key={hospital._id} className="grid grid-cols-[1fr_2fr_2fr_1fr_1fr] gap-4 p-4 border-b items-center">
                        <img 
                            src={hospital.image || 'https://via.placeholder.com/150'} 
                            alt={hospital.name} 
                            className="w-16 h-16 rounded object-cover"
                        />
                        <p className="font-medium">{hospital.name}</p>
                        <div className="text-sm">
                            <p>{hospital.location.city}</p>
                            <p className="text-gray-500">{hospital.location.pincode}</p>
                        </div>
                        <p>{hospital.doctors?.length || 0}</p>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => deleteHospital(hospital._id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HospitalsList;
