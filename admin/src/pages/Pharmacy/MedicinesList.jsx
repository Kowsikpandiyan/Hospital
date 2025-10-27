// admin/src/pages/Pharmacy/MedicinesList.jsx
import React, { useContext, useEffect, useState } from 'react'
import { PharmacyContext } from '../../context/PharmacyContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const MedicinesList = () => {
    const { pToken, backendUrl, medicines, getMedicines } = useContext(PharmacyContext)
    const [editingId, setEditingId] = useState(null)
    const [editQuantity, setEditQuantity] = useState('')

    useEffect(() => {
        if (pToken) {
            getMedicines()
        }
    }, [pToken])

    // ✅ Update stock quantity
    const updateStock = async (medicineId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/pharmacy/update-stock',
                { medicineId, quantity: editQuantity },
                { headers: { ptoken: pToken } }
            )
            if (data.success) {
                toast.success(data.message)
                getMedicines()
                setEditingId(null)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // ✅ Delete medicine from inventory
    const deleteMedicine = async (medicineId) => {
        if (window.confirm('Are you sure you want to delete this medicine?')) {
            try {
                const { data } = await axios.post(
                    backendUrl + '/api/pharmacy/delete-medicine',
                    { medicineId },
                    { headers: { ptoken: pToken } }
                )
                if (data.success) {
                    toast.success(data.message)
                    getMedicines()
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    return (
        <div className="m-5 max-h-[90vh] overflow-y-scroll">
            <h1 className="text-lg font-medium mb-4">Medicine Inventory</h1>
            <div className="bg-white rounded-lg shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-4">Name</th>
                                <th className="text-left p-4">Category</th>
                                <th className="text-left p-4">Stock</th>
                                <th className="text-left p-4">Price</th>
                                <th className="text-left p-4">Expiry</th>
                                <th className="text-left p-4">Status</th>
                                <th className="text-left p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicines.map((medicine) => (
                                <tr key={medicine._id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">
                                        <div>
                                            <p className="font-medium">{medicine.name}</p>
                                            <p className="text-sm text-gray-500">{medicine.genericName}</p>
                                        </div>
                                    </td>
                                    <td className="p-4">{medicine.category}</td>
                                    <td className="p-4">
                                        {editingId === medicine._id ? (
                                            <input
                                                type="number"
                                                value={editQuantity}
                                                onChange={(e) => setEditQuantity(e.target.value)}
                                                className="w-20 border rounded px-2 py-1"
                                            />
                                        ) : (
                                            <span className={medicine.quantity <= medicine.minStockLevel ? 'text-red-500' : ''}>
                                                {medicine.quantity}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4">₹{medicine.price}</td>
                                    <td className="p-4">
                                        <span className={new Date(medicine.expiryDate) < new Date() ? 'text-red-500' : ''}>
                                            {new Date(medicine.expiryDate).toLocaleDateString()}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${
                                                medicine.available
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-red-100 text-red-600'
                                            }`}
                                        >
                                            {medicine.available ? 'Available' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            {editingId === medicine._id ? (
                                                <>
                                                    <button
                                                        onClick={() => updateStock(medicine._id)}
                                                        className="text-green-500 hover:text-green-700"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingId(null)}
                                                        className="text-gray-500 hover:text-gray-700"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => {
                                                            setEditingId(medicine._id)
                                                            setEditQuantity(medicine.quantity.toString())
                                                        }}
                                                        className="text-blue-500 hover:text-blue-700"
                                                    >
                                                        Edit Stock
                                                    </button>
                                                    <button
                                                        onClick={() => deleteMedicine(medicine._id)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MedicinesList
