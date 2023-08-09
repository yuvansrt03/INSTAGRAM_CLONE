import React from 'react'
import './ProfilePage.css'
function ProfilePage() {
    return (
        <div className="profile-container">
            <div className="profile-image">
            <img src="profile-image-url.jpg" alt="Profile" />
            </div>
            <div className="profile-details">
            <h2>Username</h2>
            <p>Followers: 1000</p>
            <p>Following: 500</p>
            <p>Posts: 50</p>
            <button>Follow</button>
            </div>
        </div>
    );
}

export default ProfilePage