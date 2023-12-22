import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPosts } from "../../Slices/postSlice";
import BottomNav from "../BottomNav/BottomNav";
import LeftPanel from "../LeftPanel/LeftPanel";
const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];

    if (selectedPhoto && selectedPhoto.type === "image/jpeg") {
      setPhoto(selectedPhoto);
      setPreviewUrl(URL.createObjectURL(selectedPhoto));
    } else {
      setPhoto(null);
      setPreviewUrl(null);
    }
  };
  let formdata = new FormData();
  formdata.append("postAuthorId", user._id);
  formdata.append("postDescription", description);
  formdata.append("Image", photo);
  formdata.append("postAuthorName", user.userUserName);
  formdata.append("postAuthorProfilePic", user.userProfileImg);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
      method: "POST",
      body: formdata,
    });
    const data = await response.json();
    const alldatares = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/posts`
    );
    const alldata = await alldatares.json();
    if (data._id) {
      navigate("/");
      const sortedData = alldata.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      dispatch(setPosts(sortedData));
    }
  };

  return (
    <>
      <div>
        <img
          className="cursor-pointer left_panel_logo lg:hidden"
          src="https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png"
          onClick={() => navigate("/")}
        />
      </div>
      <LeftPanel currentpath={"createPost"} />
      <div className="flex items-start justify-center w-screen h-screen">
        <div className="flex mt-[30px] bg-white rounded-lg flex-col p-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-[300px] md:w-[500px]"
          >
            <div className="mb-4">
              <input
                type="file"
                accept="image/jpeg"
                className="hidden"
                id="photoInput"
                onChange={handlePhotoChange}
              />
              <label
                htmlFor="photoInput"
                className="block p-2 text-gray-500 border border-gray-300 rounded-md cursor-pointer"
              >
                Select a JPG Photo
              </label>
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full mt-2 rounded-lg"
                />
              )}
            </div>
            <input
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500 "
              type="text"
              placeholder="Write a description..."
              value={description}
              onChange={handleDescriptionChange}
            />
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-md bg-pink hover:bg-darkPink"
            >
              Post
            </button>
          </form>
        </div>
      </div>
      <div className="block lg:hidden">
        <BottomNav path="createPost" />
      </div>
    </>
  );
};

export default CreatePost;
