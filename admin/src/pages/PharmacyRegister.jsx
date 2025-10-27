// admin/src/pages/PharmacyRegister.jsx
import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PharmacyRegister = () => {
    const navigate = useNavigate()
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        license: '',
        address: {
            line1: '',
            line2: ''
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'line1' || name === 'line2') {
            setFormData({
                ...formData,
                address: {
                    ...formData.address,
                    [name]: value
                }
            })
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        
        try {
            const dataToSend = {
                ...formData,
                address: JSON.stringify(formData.address)
            }
            
            const { data } = await axios.post(backendUrl + '/api/pharmacy/register', dataToSend)
            
            if (data.success) {
                toast.success(data.message)
                navigate('/') // Redirect to login
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <form onSubmit={onSubmitHandler} className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
                <h2 className='text-2xl font-bold text-center mb-6'>Pharmacy Registration</h2>
                
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>
                        Pharmacy Name
                    </label>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>
                        Email
                    </label>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>
                        Password
                    </label>
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>
                        Phone Number
                    </label>
                    <input
                        type='tel'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>
                        License Number
                    </label>
                    <input
                        type='text'
                        name='license'
                        value={formData.license}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>
                        Address Line 1
                    </label>
                    <input
                        type='text'
                        name='line1'
                        value={formData.address.line1}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>
                        Address Line 2
                    </label>
                    <input
                        type='text'
                        name='line2'
                        value={formData.address.line2}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary'
                        required
                    />
                </div>

                <button
                    type='submit'
                    className='w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors'
                >
                    Register Pharmacy
                </button>

                <p className='text-center mt-4'>
                    Already have an account?{' '}
                    <span
                        onClick={() => navigate('/')}
                        className='text-primary cursor-pointer hover:underline'
                    >
                        Login here
                    </span>
                </p>
            </form>
        </div>
    )
}

export default PharmacyRegister
