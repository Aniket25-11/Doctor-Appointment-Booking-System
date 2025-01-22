import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const MyProfile = () => {
  const { userData, setUserData,backendUrl,token,loadUserProfileData } = useContext(AppContext);
  const [isEdit,setIsEdit] = useState(false)
  //tum assets vgera mt likhna aniket aur phir bhi error aye toh mujhe bolna ya yeh part skip krna ,tm bs iska div ke andar ka likhna
  //9:58:32 se phir dekho isko bnane ke lie 10:16:00 tk dekhna n krna
  return userData && <div></div>;
};

export default MyProfile;
