// frontend/src/pages/Hospitals.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Hospitals = () => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const { backendUrl, currencySymbol } = useContext(AppContext);
    const navigate = useNavigate();

    const fetchHospitals = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/hospital/list');
            if (data.success) {
                setHospitals(data.hospitals);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHospitals();
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading hospitals...</div>;
    }

    return (
        <div className="min-h-screen py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Hospitals in Tamil Nadu</h1>
                <p className="text-gray-600">Find the best hospitals and doctors near you</p>
            </div>

            <div className="space-y-8">
                {hospitals.map((hospital) => (
                    <div key={hospital._id} className="bg-white rounded-lg shadow-md p-6">
                        {/* Hospital Header */}
                        <div className="flex items-start gap-4 mb-6">
                            <img
                                src={hospital.image || 'https://via.placeholder.com/150'}
                                alt={hospital.name}
                                className="w-24 h-24 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold text-gray-800">{hospital.name}</h2>
                                <p className="text-gray-600 mt-1">
                                    {hospital.location.address}, {hospital.location.city} - {hospital.location.pincode}
                                </p>
                                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                    <span>📞 {hospital.contactInfo.phone}</span>
                                    <span>✉️ {hospital.contactInfo.email}</span>
                                </div>
                            </div>
                        </div>

                        {/* Doctors Section */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-gray-700">
                                Doctors ({hospital.doctors.length})
                            </h3>
                            
                            {hospital.doctors.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {hospital.doctors.map((doctor) => (
                                        <div
                                            key={doctor._id}
                                            onClick={() => navigate(`/appointment/${doctor._id}`)}
                                            className="border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                                        >
                                            <div className="flex items-start gap-3">
                                                <img
                                                    src={doctor.image}
                                                    alt={doctor.name}
                                                    className="w-16 h-16 rounded-full object-cover"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-800">{doctor.name}</h4>
                                                    <p className="text-sm text-gray-600">{doctor.speciality}</p>
                                                    
                                                    {/* Rating Display */}
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <div className="flex">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <span
                                                                    key={star}
                                                                    className={`text-sm ${
                                                                        star <= doctor.rating
                                                                            ? 'text-yellow-400'
                                                                            : 'text-gray-300'
                                                                    }`}
                                                                >
                                                                    ★
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <span className="text-xs text-gray-500">
                                                            {doctor.rating.toFixed(1)} ({doctor.totalRatings})
                                                        </span>
                                                    </div>
                                                    
                                                    <p className="text-sm font-medium text-primary mt-1">
                                                        ₹{doctor.fees}
                                                    </p>
                                                </div>
                                                <div className={`text-xs px-2 py-1 rounded-full ${
                                                    doctor.available 
                                                        ? 'bg-green-100 text-green-600' 
                                                        : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                    {doctor.available ? 'Available' : 'Unavailable'}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">
                                    No doctors available at this hospital
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hospitals;
