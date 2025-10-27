// admin/src/App.jsx
import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import AllAppointments from './pages/Admin/AllAppointments';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import AddHospital from './pages/Admin/AddHospital';
import HospitalsList from './pages/Admin/HospitalsList';
import { PharmacyContext } from './context/PharmacyContext';
import PharmacyDashboard from './pages/Pharmacy/PharmacyDashboard';
import Prescriptions from './pages/Pharmacy/Prescriptions';
import AddMedicine from './pages/Pharmacy/AddMedicine';
import MedicinesList from './pages/Pharmacy/MedicinesList';
import PharmacyRegister from './pages/PharmacyRegister';

const App = () => {
  const{aToken} =useContext(AdminContext)
  const{dToken} =useContext(DoctorContext)
  const{pToken} =useContext(PharmacyContext)
  
  return (
    <>
      <ToastContainer/>
      {aToken || dToken || pToken ? (
        <div className='bg-[#F8F9FD]'>
          <Navbar/>
          <div className='flex items-start'>
            <Sidebar/>
            <Routes>
              {/* Admin Routes */}
              <Route index path='/' /> 
              <Route path='/admin-dashboard' element={<Dashboard/>} />
              <Route path='/all-appointments' element={<AllAppointments />} /> 
              <Route path='/add-doctor' element={<AddDoctor />} /> 
              <Route path='/doctor-list' element={<DoctorsList />}/>
              <Route path='/add-hospital' element={<AddHospital />} />
              <Route path='/hospitals-list' element={<HospitalsList />} />
              
              {/* Doctor Routes */}
              <Route path='/doctor-dashboard' element={<DoctorDashboard />}/>
              <Route path='/doctor-appointments' element={<DoctorAppointments />}/>
              <Route path='/doctor-profile' element={<DoctorProfile/>} />

              {/* Pharmacy Routes */}
              <Route path='/pharmacy-dashboard' element={<PharmacyDashboard />} />
              <Route path='/pharmacy-prescriptions' element={<Prescriptions />} />
              <Route path='/add-medicine' element={<AddMedicine />} />
              <Route path='/medicines-list' element={<MedicinesList />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/pharmacy-register' element={<PharmacyRegister/>} />
        </Routes>
      )}
    </>
  )
}

export default App
