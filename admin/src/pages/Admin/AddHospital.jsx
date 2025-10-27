// admin/src/pages/Admin/AddHospital.jsx
import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

const AddHospital = () => {
    const [hospitalImg, setHospitalImg] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const { backendUrl, aToken } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        try {
            const formData = new FormData();
            if (hospitalImg) {
                formData.append('image', hospitalImg);
            }
            formData.append('name', name);
            formData.append('address', address);
            formData.append('city', city);
            formData.append('pincode', pincode);
            formData.append('phone', phone);
            formData.append('email', email);

            const { data } = await axios.post(
                backendUrl + '/api/hospital/add',
                formData,
                { headers: { aToken } }
            );

            if (data.success) {
                toast.success(data.message);
                // Reset form
                setHospitalImg(false);
                setName('');
                setAddress('');
                setCity('');
                setPincode('');
                setPhone('');
                setEmail('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="m-5 w-full">
            <p className="mb-3 text-lg font-medium">Add Hospital</p>
            <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
                <div className="flex items-center gap-4 mb-8 text-gray-500">
                    <label htmlFor="hospital-img">
                        <img
                            className="w-16 bg-gray-100 rounded-full cursor-pointer"
                            src={hospitalImg ? URL.createObjectURL(hospitalImg) : assets.upload_area}
                            alt="Upload Area"
                        />
                    </label>
                    <input 
                        onChange={(e) => setHospitalImg(e.target.files[0])} 
                        type="file" 
                        id="hospital-img" 
                        hidden 
                    />
                    <p>Upload hospital<br />picture</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <p>Hospital Name</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="border rounded px-3 py-2"
                            type="text"
                            placeholder="Hospital Name"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <p>Email</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="border rounded px-3 py-2"
                            type="email"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <p>Phone</p>
                        <input
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            className="border rounded px-3 py-2"
                            type="tel"
                            placeholder="Phone Number"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <p>City</p>
                        <input
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            className="border rounded px-3 py-2"
                            type="text"
                            placeholder="City"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <p>Pincode</p>
                        <input
                            onChange={(e) => setPincode(e.target.value)}
                            value={pincode}
                            className="border rounded px-3 py-2"
                            type="text"
                            placeholder="Pincode"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1 mt-4">
                    <p>Address</p>
                    <textarea
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        className="border rounded px-3 py-2"
                        placeholder="Full Address"
                        rows="3"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
                >
                    Add Hospital
                </button>
            </div>
        </form>
    );
};

export default AddHospital;
