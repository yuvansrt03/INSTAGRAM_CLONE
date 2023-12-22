import React, { useState } from "react";
import axios from "axios";
import "./RegisterPage.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../Slices/authSlice";
function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(image);
    var formdata = new FormData();
    formdata.append("userUserName", userName);
    formdata.append("userPassword", password);
    formdata.append("userName", name);
    formdata.append("userEmail", email);
    formdata.append("userDOB", date);
    formdata.append("Image", image);
    // console.log(formdata.get('Image'))
    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
      formdata
    );
    if (response.data.userUserName) {
      // console.log(response.data)
      dispatch(setLogin(response.data));
      navigate("/");
    }
  };
  const handleChangeLogin = () => {
    navigate("/");
  };
  return (
    <div className="flex items-center justify-center h-screen ">
      <form className="">
        <div className="flex items-center justify-center w-full">
          <img
            className="mb-5 cursor-pointer left_panel_logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png"
          />
        </div>
        <div className="w-full mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="userName"
          >
            Username
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="userName"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            placeholder="Username"
          />
        </div>
        <div className="w-full mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
          />
        </div>
        <div className="w-full mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="******************"
          />
        </div>
        <div className="w-full mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            value={email}
          />
        </div>
        <div className="w-full mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="date"
          >
            Date of Birth
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date of Birth"
            value={date}
          />
        </div>
        <div className="w-full mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="image"
          >
            Profile Image
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setImagePreview(URL.createObjectURL(e.target.files[0]));
            }}
            placeholder="Profile Image"
          />
          {imagePreview && (
            <div className="relative mt-4">
              <button
                className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full"
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
              >
                X
              </button>
              <img
                className="object-cover w-32 h-32"
                src={imagePreview}
                alt="Profile preview"
              />
            </div>
          )}
        </div>
        <button
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-700">Already have an account?</span>
          <span
            className="ml-2 text-blue-500 cursor-pointer hover:text-blue-700"
            onClick={handleChangeLogin}
          >
            Sign in
          </span>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
