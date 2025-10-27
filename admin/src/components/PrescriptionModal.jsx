import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { DoctorContext } from '../context/DoctorContext'
import { useContext } from 'react'

const PrescriptionModal = ({ appointment, onClose, onSuccess }) => {
    const { backendUrl, dToken } = useContext(DoctorContext)
    const [prescription, setPrescription] = useState({
        diagnosis: '',
        notes: '',
        medicines: [{ name: '', dosage: '', duration: '', instructions: '' }]
    })
    const [loading, setLoading] = useState(false)

    const addMedicine = () => {
        setPrescription({
            ...prescription,
            medicines: [...prescription.medicines, { name: '', dosage: '', duration: '', instructions: '' }]
        })
    }

    const removeMedicine = (index) => {
        const newMedicines = prescription.medicines.filter((_, i) => i !== index)
        setPrescription({ ...prescription, medicines: newMedicines })
    }

    const updateMedicine = (index, field, value) => {
        const newMedicines = [...prescription.medicines]
        newMedicines[index][field] = value
        setPrescription({ ...prescription, medicines: newMedicines })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!prescription.diagnosis) {
            toast.error('Please enter diagnosis')
            return
        }

        setLoading(true)
        try {
            const { data } = await axios.post(
                backendUrl + '/api/doctor/add-prescription',
                {
                    appointmentId: appointment._id,
                    prescription: prescription
                },
                { headers: { dToken } }
            )

            if (data.success) {
                toast.success('Prescription added successfully')
                onSuccess()
                onClose()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Add Prescription</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="mb-4 p-3 bg-gray-50 rounded">
                    <p className="text-sm"><strong>Patient:</strong> {appointment.userData.name}</p>
                    <p className="text-sm"><strong>Date:</strong> {appointment.slotDate} at {appointment.slotTime}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Diagnosis</label>
                        <input
                            type="text"
                            value={prescription.diagnosis}
                            onChange={(e) => setPrescription({ ...prescription, diagnosis: e.target.value })}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter diagnosis"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium">Medicines</label>
                            <button
                                type="button"
                                onClick={addMedicine}
                                className="text-sm bg-primary text-white px-3 py-1 rounded"
                            >
                                Add Medicine
                            </button>
                        </div>

                        {prescription.medicines.map((medicine, index) => (
                            <div key={index} className="border rounded p-3 mb-2">
                                <div className="grid grid-cols-2 gap-3 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Medicine name"
                                        value={medicine.name}
                                        onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                                        className="border rounded px-2 py-1 text-sm"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Dosage (e.g., 500mg)"
                                        value={medicine.dosage}
                                        onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                                        className="border rounded px-2 py-1 text-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        placeholder="Duration (e.g., 5 days)"
                                        value={medicine.duration}
                                        onChange={(e) => updateMedicine(index, 'duration', e.target.value)}
                                        className="border rounded px-2 py-1 text-sm"
                                    />
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Instructions"
                                            value={medicine.instructions}
                                            onChange={(e) => updateMedicine(index, 'instructions', e.target.value)}
                                            className="border rounded px-2 py-1 text-sm flex-1"
                                        />
                                        {prescription.medicines.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeMedicine(index)}
                                                className="text-red-500 text-sm"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Additional Notes</label>
                        <textarea
                            value={prescription.notes}
                            onChange={(e) => setPrescription({ ...prescription, notes: e.target.value })}
                            className="w-full border rounded px-3 py-2"
                            rows="3"
                            placeholder="Any additional instructions or notes"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Prescription'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PrescriptionModal
