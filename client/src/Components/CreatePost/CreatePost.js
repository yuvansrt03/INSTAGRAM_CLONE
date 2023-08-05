import React, { useState } from 'react';

const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className="h-screen flex justify-center items-center"> 
        <div className="flex flex-col max-w-sm m-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Create Post</h2>
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
                className="block border border-gray-300 rounded-md p-2 cursor-pointer text-gray-500"
                >
                Select a JPG Photo
            </label>
            {previewUrl && (
                <img
                    src={previewUrl}
                    alt="Preview"
                    className="mt-2 rounded-lg w-full"
                />
                )}
            </div>
            <input
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500 mb-4 "
                type='text'
                placeholder="Write a description..."
                value={description}
                onChange={handleDescriptionChange}
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
            Post
            </button>
        </form>
        </div>
    </div>
  );
};

export default CreatePost;
