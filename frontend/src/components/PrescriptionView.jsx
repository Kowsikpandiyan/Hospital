import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const PrescriptionView = ({ appointment, onClose }) => {
    const { backendUrl, token } = useContext(AppContext)
    const [prescription, setPrescription] = useState(null)
    const [loading, setLoading] = useState(true)

    React.useEffect(() => {
        fetchPrescription()
    }, [])

    const fetchPrescription = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/get-prescription',
                { appointmentId: appointment._id },
                { headers: { token } }
            )
            
            if (data.success) {
                setPrescription(data.prescription)
            }
        } catch (error) {
            toast.error('Failed to load prescription')
        } finally {
            setLoading(false)
        }
    }

    const handlePrint = () => {
        window.print()
    }

    const handleDownload = () => {
        // Create a simple text version for download
        let content = `PRESCRIPTION\n\n`;
        content += `Doctor: ${appointment.docData.name}\n`;
        content += `Patient: ${appointment.userData.name}\n`;
        content += `Date: ${new Date(prescription.prescribedDate).toLocaleDateString()}\n\n`;
        content += `Diagnosis: ${prescription.diagnosis}\n\n`;
        content += `Medicines:\n`;
        prescription.medicines.forEach((med, index) => {
            if (med.name) {
                content += `${index + 1}. ${med.name}\n`;
                content += `   Dosage: ${med.dosage}\n`;
                content += `   Duration: ${med.duration}\n`;
                content += `   Instructions: ${med.instructions}\n\n`;
            }
        });
        if (prescription.notes) {
            content += `Notes: ${prescription.notes}\n`;
        }

        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `prescription_${appointment._id}.txt`;
        a.click();
    }

    if (loading) return <div className="text-center p-4">Loading prescription...</div>

    if (!prescription) {
        return (
            <div className="text-center p-4">
                <p className="text-gray-500">No prescription available for this appointment.</p>
                <button 
                    onClick={onClose}
                    className="mt-4 bg-gray-200 px-4 py-2 rounded"
                >
                    Close
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg prescription-content">
            <div className="mb-6 text-center border-b pb-4">
                <h2 className="text-2xl font-bold text-primary">Medical Prescription</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Prescribed on: {new Date(prescription.prescribedDate).toLocaleDateString()}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <p className="text-sm text-gray-600">Doctor</p>
                    <p className="font-medium">{appointment.docData.name}</p>
                    <p className="text-sm">{appointment.docData.speciality}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Patient</p>
                    <p className="font-medium">{appointment.userData.name}</p>
                    <p className="text-sm">Age: {appointment.userData.age || 'N/A'}</p>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Diagnosis</h3>
                <p className="bg-gray-50 p-3 rounded">{prescription.diagnosis}</p>
            </div>

            <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Prescribed Medicines</h3>
                <div className="space-y-3">
                    {prescription.medicines.map((medicine, index) => (
                        medicine.name && (
                            <div key={index} className="border rounded p-4 bg-gray-50">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <p className="font-medium text-lg">{index + 1}. {medicine.name}</p>
                                        <div className="mt-1 text-sm text-gray-600">
                                            <p><span className="font-medium">Dosage:</span> {medicine.dosage}</p>
                                            <p><span className="font-medium">Duration:</span> {medicine.duration}</p>
                                            <p><span className="font-medium">Instructions:</span> {medicine.instructions}</p>
                                        </div>
                                                                            </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>

            {prescription.notes && (
                <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2">Additional Notes</h3>
                    <p className="bg-yellow-50 p-3 rounded">{prescription.notes}</p>
                </div>
            )}

            <div className="mt-6 flex gap-3 no-print">
                <button
                    onClick={handlePrint}
                    className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark"
                >
                    Print Prescription
                </button>
                <button
                    onClick={handleDownload}
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                    Download
                </button>
                <button
                    onClick={onClose}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default PrescriptionView
