// admin/src/components/Navbar.jsx
import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { PharmacyContext } from '../context/PharmacyContext'

const Navbar = () => {
  const {aToken,setAToken} =useContext(AdminContext)
  const {dToken,setDToken} =useContext(DoctorContext)
  const {pToken,setPToken} =useContext(PharmacyContext)

  const navigate =useNavigate()
  const logout = () => {
    navigate('/')
    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }
    if (dToken) {
      setDToken('')
      localStorage.removeItem('dToken')
    }
    if (pToken) {
      setPToken('')
      localStorage.removeItem('pToken')
    }
  }
  
  const getUserType = () => {
    if (aToken) return 'Admin'
    if (dToken) return 'Doctor'
    if (pToken) return 'Pharmacy'
    return ''
  }
  
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt=""/>
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{getUserType()}</p>
      </div>
      <button onClick={()=> logout()} className="bg-primary text-white text-sm px-10 py-2 rounded-full">Logout</button>
    </div>
  )
}

export default Navbar
