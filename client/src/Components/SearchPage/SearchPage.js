import React, { useEffect, useState } from "react";
import LeftPanel from "../LeftPanel/LeftPanel";
import UserProfile from "../UserProfile/UserProfile";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import { all } from "axios";
import BottomNav from "../BottomNav/BottomNav";
import { useNavigate } from "react-router-dom";
function SearchPage() {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [reducedData, setReducedData] = useState([]);
  const user = useSelector((store) => store.auth.user);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    const userdata = await fetch("http://localhost:5000/users");
    const data = await userdata.json();
    const filteredData = data.filter((item) => item._id !== user._id);
    let count = 0;
    const reducedData = filteredData.filter((item) => {
      if (count < 5) {
        count++;
        return true;
      }
      return false;
    });
    setIsLoading(false);
    setAllUsers(filteredData);
    setReducedData(reducedData);
    setUsers(reducedData);
  };
  const handleChange = (e) => {
    setName(e.target.value);
    if (e.target.value === "") return setUsers(reducedData);

    const filteredUsers = allUsers.filter(
      (item) =>
        item.userName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.userUserName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setUsers(filteredUsers);
  };
  return (
    <div className="h-screen overflow-hidden">
      <LeftPanel currentpath={"search"} />
      <BottomNav path={"search"} />
      <div className="w-[100vw] lg:ml-[250px]">
        <img
          className="cursor-pointer left_panel_logo lg:hidden"
          src="https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="w-full mt-5">
        <form
          action=""
          className="flex items-center justify-center h-[40px] w-full px-2"
        >
          <input
            type="text"
            value={name}
            className="w-[270px] md:w-[400px] h-full p-2 text-gray-600 bg-gray-100 border-2 border-gray-200 rounded-full  focus:outline-none"
            placeholder="Search users..."
            onChange={(e) => handleChange(e)}
          />
          <button
            type="submit"
            className="bg-pink text-white px-3 py-2 text-[14px] rounded-full ml-2 h-full"
          >
            Search
          </button>
        </form>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        {isLoading ? (
          <Loader />
        ) : users.length > 0 ? (
          <>
            {users.map((item) => (
              <div className="w-[370px] md:w-[450px] p-2 border-0 border-b-2 border-gray-300">
                <UserProfile friend={item} inSearch={true} />
              </div>
            ))}
            {/* <div className="w-[450px] mt-2">See More...</div> */}
          </>
        ) : (
          <div className="text-gray-600 text-[14px]">No users found</div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
