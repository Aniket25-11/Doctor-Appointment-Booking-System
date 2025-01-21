import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler} className="min-h-[80vh] flex items-center">
        <label htmlFor="">Full Name</label>
        <input type="text" placeholder="name" />
        <label htmlFor="">Email</label>
        <input type="email" />
        <label htmlFor="">password</label>
        <input type="password" />
        <button type='submit'>login</button>
      </form>
    </>
  );
};

export default Login;
