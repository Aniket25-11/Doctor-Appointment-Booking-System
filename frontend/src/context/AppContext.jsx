import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [token,setToken] = useState('')
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
        // console.log(data.doctors)
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const value = {
    doctors,
    currencySymbol,token,setToken,backendUrl
  };
  useEffect(()=>{
    getDoctorsData()
  },[])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
