// admin/src/pages/Pharmacy/AddMedicine.jsx
import React, { useState, useContext } from 'react'
import { PharmacyContext } from '../../context/PharmacyContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddMedicine = () => {
    const { backendUrl, pToken, getMedicines } = useContext(PharmacyContext)
    const [formData, setFormData] = useState({
        name: '',
        genericName: '',
        manufacturer: '',
        category: 'tablets',
        quantity: '',
        price: '',
        expiryDate: '',
        batchNumber: '',
        description: '',
        minStockLevel: '10'
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(
                backendUrl + '/api/pharmacy/add-medicine',
                formData,
                { headers: { ptoken: pToken } }
            )
            if (data.success) {
                toast.success(data.message)
                setFormData({
                    name: '',
                    genericName: '',
                    manufacturer: '',
                    category: 'tablets',
                    quantity: '',
                    price: '',
                    expiryDate: '',
                    batchNumber: '',
                    description: '',
                    minStockLevel: '10'
                })
                getMedicines()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="m-5 w-full">
            <p className="mb-3 text-lg font-medium">Add Medicine</p>
            <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <p>Medicine Name*</p>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border rounded px-3 py-2"
                            type="text"
                            placeholder="Medicine Name"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <p>Generic Name</p>
                        <input
                            name="genericName"
                            value={formData.genericName}
                            onChange={handleChange}
                            className="border rounded px-3 py-2"
                            type="text"
                            placeholder="Generic Name"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <p>Manufacturer</p>
                        <input
                            name="manufacturer"
                            value={formData.manufacturer}
                            onChange={handleChange}
                            className="border rounded px-3 py-2"
                            type="text"
                            placeholder="Manufacturer"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <p>Category</p>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="border rounded px-3 py-2"
                        >
                            <option value="tablets">Tablets</option>
                            <option value="syrup">Syrup</option>
                            <option value="injection">Injection</option>
                            <option value="ointment">Ointment</option>
                            <option value="drops">Drops</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <p>Quantity*</p>
                        <input
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="border rounded px-3 py-2"
                            type="number"
                            placeholder="Quantity"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <p>Price (₹)*</p>
                        <input
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="border rounded px-3 py-2"
                            type="number"
                            placeholder="Price"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <p>Expiry Date*</p>
                        <input
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            className="border rounded px-3 py-2"
                            type="date"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <p>Batch Number</p>
                        <input
                            name="batchNumber"
                            value={formData.batchNumber}
                            onChange={handleChange}
                            className="border rounded px-3 py-2"
                            type="text"
                            placeholder="Batch Number"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <p>Minimum Stock Level</p>
                        <input
                            name="minStockLevel"
                            value={formData.minStockLevel}
                            onChange={handleChange}
                            className="border rounded px-3 py-2"
                            type="number"
                            placeholder="Minimum Stock Level"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1 mt-4">
                    <p>Description</p>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border rounded px-3 py-2"
                        placeholder="Medicine description"
                        rows="3"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
                >
                    Add Medicine
                </button>
            </div>
        </form>
    )
}

export default AddMedicine
