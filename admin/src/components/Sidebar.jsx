// admin/src/components/Sidebar.jsx
import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { PharmacyContext } from '../context/PharmacyContext'

const Sidebar = () => {
  const {aToken} =useContext(AdminContext)
  const {dToken} =useContext(DoctorContext)
  const {pToken} =useContext(PharmacyContext)
  
  return (
    <div className='min-h-screen bg-white border-r'>
      {
        aToken && <ul className='text-[#515151] mt-5'>
        <NavLink  className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/admin-dashboard'}> 
          <img src={assets.home_icon} alt="" /> 
          <p className='hidden md:block'>Dashboard</p> 
        </NavLink>
        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/all-appointments'}> 
          <img src={assets.appointment_icon} alt="" /> 
          <p className='hidden md:block'>Appointments</p> 
        </NavLink>
        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/add-doctor'}> 
          <img src={assets.add_icon} alt="" /> 
          <p className='hidden md:block'>Add Doctor</p> 
        </NavLink>
        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/doctor-list'}> 
          <img src={assets.people_icon} alt="" /> 
          <p className='hidden md:block'>Doctors List</p> 
        </NavLink>
        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/add-hospital'}> 
          <img src={assets.add_icon} alt="" /> 
          <p className='hidden md:block'>Add Hospital</p> 
        </NavLink>
        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/hospitals-list'}> 
          <img src={assets.list_icon} alt="" /> 
          <p className='hidden md:block'>Hospitals List</p> 
        </NavLink>
        </ul>
      }
      
      {
        dToken && <ul className='text-[#515151] mt-5'>
        <NavLink  className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/doctor-dashboard'}> 
          <img src={assets.home_icon} alt="" /> 
          <p className='hidden md:block'>Dashboard</p> 
        </NavLink>
        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/doctor-appointments'}> 
          <img src={assets.appointment_icon} alt="" /> 
          <p className='hidden md:block'>Appointments</p> 
        </NavLink>
        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/doctor-profile'}> 
          <img src={assets.people_icon} alt="" /> 
          <p className='hidden md:block'>Profile</p> 
        </NavLink>
        </ul>
      }

      {
        pToken && <ul className='text-[#515151] mt-5'>
        <NavLink  className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/pharmacy-dashboard'}> 
          <img src={assets.home_icon} alt="" /> 
          <p className='hidden md:block'>Dashboard</p> 
        </NavLink>
        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/pharmacy-prescriptions'}> 
          <img src={assets.appointment_icon} alt="" /> 
          <p className='hidden md:block'>Prescriptions</p> 
        </NavLink>
        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/add-medicine'}> 
          <img src={assets.add_icon} alt="" /> 
          <p className='hidden md:block'>Add Medicine</p> 
        </NavLink>
        <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/medicines-list'}> 
          <img src={assets.list_icon} alt="" /> 
          <p className='hidden md:block'>Medicine Inventory</p> 
        </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar
