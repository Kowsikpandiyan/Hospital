// admin/src/context/PharmacyContext.jsx
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

export const PharmacyContext = createContext();

const PharmacyContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [pToken, setPToken] = useState(localStorage.getItem('pToken') ? localStorage.getItem('pToken') : '');
    const [medicines, setMedicines] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [pharmacyData, setPharmacyData] = useState(false);

    const getMedicines = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/pharmacy/medicines', { headers: { ptoken: pToken } });
            if (data.success) {
                setMedicines(data.medicines);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getPrescriptions = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/pharmacy/prescriptions', { headers: { ptoken: pToken } });
            if (data.success) {
                setPrescriptions(data.prescriptions);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/pharmacy/dashboard', { headers: { ptoken: pToken } });
            if (data.success) {
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getPharmacyProfile = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/pharmacy/profile', { headers: { ptoken: pToken } });
            if (data.success) {
                setPharmacyData(data.pharmacy);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const value = {
        backendUrl,
        pToken,
        setPToken,
        medicines,
        setMedicines,
        getMedicines,
        prescriptions,
        getPrescriptions,
        dashData,
        getDashData,
        pharmacyData,
        getPharmacyProfile
    };

    return (
        <PharmacyContext.Provider value={value}>
            {props.children}
        </PharmacyContext.Provider>
    );
};

export default PharmacyContextProvider;
