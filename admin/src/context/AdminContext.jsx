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
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { adminToken } }
      );
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

  const changeAvailability = async (doctorId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { doctorId },
        { headers: { adminToken } }
      );
      if (data.success) {
        toast.success(data.message);
        // getAllDoctors();
        setDoctors((prevDoctors) => {
          const updatedDoctors = prevDoctors.map((doctor) =>
            doctor._id === doctorId
              ? { ...doctor, available: !doctor.available }
              : doctor
          );
          // console.log("Updated doctors:", updatedDoctors); // Check updated state
          return updatedDoctors;
        });
        
      } else {
        toast.error(data.message || "Failed to update availability.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };
  const value = {
    adminToken,
    setAdminToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
export default AdminContextProvider;
