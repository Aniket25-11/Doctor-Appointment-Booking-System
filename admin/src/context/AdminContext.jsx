import { useState } from "react";
import { createContext } from "react";

export const AdminContext = createContext();
const AdminContextProvider = ({ children }) => {
// const AdminContextProvider = ({ props }) => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('AdminToken') ? localStorage.getItem('AdminToken'):'')
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  
  const value = {
    adminToken,
    setAdminToken,
    backendUrl,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
export default AdminContextProvider;
