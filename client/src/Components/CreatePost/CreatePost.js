import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const user=useSelector(store=>store.auth.user);
  const navigate=useNavigate();
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];

    if (selectedPhoto && selectedPhoto.type === 'image/jpeg') {
      setPhoto(selectedPhoto);
      setPreviewUrl(URL.createObjectURL(selectedPhoto));
    } else {
      setPhoto(null);
      setPreviewUrl(null);
    }
  };
  let formdata=new FormData();
  formdata.append('postAuthorId',user._id);
  formdata.append('postDescription',description);
  formdata.append('Image',photo);
  formdata.append('postAuthorName',user.userUserName);
  formdata.append('postAuthorProfilePic',user.userProfileImg);
  const handleSubmit = async(e) => {
    e.preventDefault();
    const response=await fetch('http://localhost:5000/posts',{
      method:'POST',
      body:formdata,
    })
    const data=await response.json();
    if(data._id){
      // navigate('/')
    }
  };

  return (
    <div className="flex items-center justify-center h-screen"> 
        <div className="flex flex-col max-w-sm p-4 m-auto bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-bold">Create Post</h2>
        <form onSubmit={handleSubmit}>
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
                type='text'
                placeholder="Write a description..."
                value={description}
                onChange={handleDescriptionChange}
            />
            <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
            Post
            </button>
        </form>
        </div>
    </div>
  );
};

export default CreatePost;
