// admin/src/pages/Pharmacy/PharmacyDashboard.jsx
import React, { useContext, useEffect } from 'react'
import { PharmacyContext } from '../../context/PharmacyContext'
import { assets } from '../../assets/assets'

const PharmacyDashboard = () => {
    const { pToken, dashData, getDashData } = useContext(PharmacyContext)

    useEffect(() => {
        if (pToken) {
            getDashData()
        }
    }, [pToken])

    return dashData && (
        <div className='m-5'>
            <div className='flex flex-wrap gap-3'>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.earning_icon} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.totalMedicines}</p>
                        <p className='text-gray-400'>Total Medicines</p>
                    </div>
                </div>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.appointments_icon} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.availableMedicines}</p>
                        <p className='text-gray-400'>Available Medicines</p>
                    </div>
                </div>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.patients_icon} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.lowStockCount}</p>
                        <p className='text-gray-400'>Low Stock Items</p>
                    </div>
                </div>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.cancel_icon} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-red-600'>{dashData.expiredCount}</p>
                        <p className='text-gray-400'>Expired Medicines</p>
                    </div>
                </div>
            </div>

            {dashData.lowStockMedicines && dashData.lowStockMedicines.length > 0 && (
                <div className='bg-white mt-10'>
                    <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border'>
                        <img src={assets.list_icon} alt="" />
                        <p className='font-semibold'>Low Stock Alert</p>
                    </div>
                    <div className='pt-4 border border-t-0'>
                        {dashData.lowStockMedicines.map((item, index) => (
                            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                                <div className='flex-1 text-sm'>
                                    <p className='text-gray-800 font-medium'>{item.name}</p>
                                    <p className='text-gray-600'>Current Stock: {item.quantity}</p>
                                </div>
                                <p className='text-red-500 text-sm'>Min: {item.minStockLevel}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default PharmacyDashboard
