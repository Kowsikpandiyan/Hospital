import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import PrescriptionModal from '../../components/PrescriptionModal'

const DoctorAppointments = () => {
  const {dToken, getAppointments, appointments,completeAppointment,cancelAppointment} = useContext(DoctorContext)
  const{slotDateFormat,currency,calculateAge} =useContext(AppContext)
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  useEffect(()=>{
    if(dToken)
      getAppointments()
  },[dToken])

  const handleAddPrescription = (appointment) => {
    setSelectedAppointment(appointment)
    setShowPrescriptionModal(true)
  }

  return (
    <div className='w-full max-w-6xl m-5'>
        <p className='mb-3 text-lg font-medium'>All Appointments</p>
        <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
          <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1.5fr] grid-flow-col py-3 px-6 border-b'>
            <p>#</p>
            <p>Patients</p>
            <p>Payment</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Actions</p>
          </div>
          {appointments.map((item,index)=>(
            <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1.5fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
              <p className='max-sm:hidden'>{index+1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={item.userData.image} alt=""/>
                <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                </div>
                <div>
                  <p className='text-xs inline border border-primary px-2 rounded-full'>
                    {item.payment ? 'Online':'Cash'}
                  </p>
                  </div>
                  <p className='max_sm:hidden'>{calculateAge(item.userData.dob)}</p>
                  <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
                  <p>{currency}{item.amount}</p>
                  {
                    item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                    :item.isCompleted ? (
                      <div className='flex items-center gap-2'>
                        <p className='text-green-500 text-xs font-medium'>Completed</p>
                        <button
                          onClick={() => handleAddPrescription(item)}
                          className='text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600'
                          title={item.prescription ? 'Edit Prescription' : 'Add Prescription'}
                        >
                          {item.prescription ? '📝' : '➕'} Rx
                        </button>
                      </div>
                    )
                      :
                  <div className='flex gap-2'>
                    <img 
                      className='w-6 cursor-pointer' 
                      onClick={()=>cancelAppointment(item._id)} 
                      src={assets.cancel_icon} 
                      alt="" 
                    />
                    <img 
                      className='w-6 cursor-pointer' 
                      onClick={()=>completeAppointment(item._id)} 
                      src={assets.tick_icon} 
                      alt=""
                    />
                    </div>
                  }
            </div>
          ))}
        </div>
        
        {showPrescriptionModal && (
          <PrescriptionModal
            appointment={selectedAppointment}
            onClose={() => setShowPrescriptionModal(false)}
            onSuccess={() => getAppointments()}
          />
        )}
      </div>
  )
}

export default DoctorAppointments
