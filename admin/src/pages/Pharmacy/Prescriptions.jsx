// admin/src/pages/Pharmacy/Prescriptions.jsx
import React, { useContext, useEffect, useState } from 'react'
import { PharmacyContext } from '../../context/PharmacyContext'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Prescriptions = () => {
    const { pToken, backendUrl, prescriptions, getPrescriptions } = useContext(PharmacyContext)
    const [selectedPrescription, setSelectedPrescription] = useState(null)
    const [availabilityStatus, setAvailabilityStatus] = useState([])
    const [showAvailability, setShowAvailability] = useState(false)

    useEffect(() => {
        if (pToken) {
            getPrescriptions()
        }
    }, [pToken])

    const checkAvailability = async (prescriptionId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/pharmacy/check-availability',
                { prescriptionId },
                { headers: { ptoken: pToken } }
            )
            if (data.success) {
                setAvailabilityStatus(data.availabilityStatus)
                setShowAvailability(true)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <div className="m-5">
            <h1 className="text-lg font-medium mb-4">All Prescriptions</h1>
            
            <div className="space-y-4">
                {prescriptions.map((appointment, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-4 border">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-semibold text-lg">
                                    Patient: {appointment.userData.name}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Doctor: Dr. {appointment.docData.name} ({appointment.docData.speciality})
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Date: {formatDate(appointment.prescription.prescribedDate)}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedPrescription(appointment)
                                    checkAvailability(appointment._id)
                                }}
                                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
                            >
                                Check Availability
                            </button>
                        </div>

                        <div className="border-t pt-3">
                            <p className="font-medium mb-2">Diagnosis: {appointment.prescription.diagnosis}</p>
                            <div className="space-y-2">
                                <p className="font-medium">Prescribed Medicines:</p>
                                {appointment.prescription.medicines.map((medicine, idx) => (
                                    medicine.name && (
                                        <div key={idx} className="ml-4 p-2 bg-gray-50 rounded">
                                            <p className="font-medium">{idx + 1}. {medicine.name}</p>
                                            <div className="text-sm text-gray-600 ml-4">
                                                <p>Dosage: {medicine.dosage}</p>
                                                <p>Duration: {medicine.duration}</p>
                                                <p>Instructions: {medicine.instructions}</p>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                            {appointment.prescription.notes && (
                                <div className="mt-3">
                                    <p className="font-medium">Notes:</p>
                                    <p className="text-gray-600 ml-4">{appointment.prescription.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Availability Modal */}
            {showAvailability && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Medicine Availability Status</h2>
                            <button
                                onClick={() => setShowAvailability(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="space-y-3">
                            {availabilityStatus.map((status, index) => (
                                <div key={index} className={`p-3 rounded border ${
                                    status.available ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                                }`}>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{status.medicineName}</p>
                                            {status.available ? (
                                                <p className="text-sm text-green-600">
                                                    In Stock: {status.inStock} units | Price: ₹{status.price}
                                                </p>
                                            ) : (
                                                <p className="text-sm text-red-600">Out of Stock</p>
                                            )}
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            status.available 
                                                ? 'bg-green-100 text-green-700' 
                                                : 'bg-red-100 text-red-700'
                                        }`}>
                                            {status.available ? 'Available' : 'Not Available'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowAvailability(false)}
                            className="mt-4 bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 w-full"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Prescriptions
