import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";

function DoctorProfile() {
  const { setProfileData, profileData, getProfile, doctorToken } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  useEffect(() => {
    if (doctorToken) {
      getProfile();
    }
  }, [doctorToken]);
  return (
    profileData && (
      <div className="flex flex-col gap-4 m-5">
        <div>
          <div>
            <img src={profileData.image} alt="" />
          </div>
          <div>
            <p>{profileData.name}</p>
            <div>
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button>{profileData.experience}</button>
            </div>
            {/* about */}
            <div>
              <p>About: </p>
              <p>{profileData.about}</p>
            </div>
            <p>
              Appointment fees:
              <span>
                {currency}
                {profileData.fees}
              </span>{" "}
            </p>
          </div>
          <div>
            <p>Address:</p>
            <p>{profileData.address.line1}</p>
            <p>{profileData.address.line2}</p>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Avaliable</label>
          </div>
          <button>Edit</button>
        </div>
      </div>
    )
  );
}

export default DoctorProfile;
