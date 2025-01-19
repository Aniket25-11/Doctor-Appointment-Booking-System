import { useState } from "react";
import axios from "axios";
import { createContext } from "react";
import { toast } from "react-toastify";
export const AdminContext = createContext();
const AdminContextProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") ? localStorage.getItem("adminToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/admin/all-doctors",
        {},
        { headers: { adminToken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const value = {
    adminToken,
    setAdminToken,
    backendUrl,doctors,getAllDoctors
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
export default AdminContextProvider;
