import React, { useState } from "react";
import { setLogin, setLogout } from "../../Slices/authSlice";
import "./LoginPage.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginPic from "../../assets/finding-a-new-app-in-mobile-phone-upscaled.png";
function LoginPage() {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.auth);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();
  // const [date,setDate]=useState("");
  const handleSubmit = async (e) => {
    console.log(name, password);
    e.preventDefault();
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userUserName: name,
        userPassword: password,
      }),
    });
    const data = await response.json();
    if (data._id) {
      dispatch(setLogin(data));
    } else {
      setInvalid(true);
    }
  };
  const handleNewUser = () => {
    navigate("/register");
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="w-1/2 max-w-xs mx-auto my-10">
        <div className="flex items-center justify-center w-full">
          <img
            className="mb-5 cursor-pointer left_panel_logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png"
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </div>
        <div className="w-full mt-4 text-center">
          <span className="text-gray-700">New Here?</span>
          <span
            className="ml-2 text-blue-500 cursor-pointer hover:text-blue-700"
            onClick={() => navigate("/register")}
          >
            Create Account
          </span>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
