import React from 'react'
import './UserProfile.css'
function UserProfile() {
  return (
    <div className="userProfile_container">
        <img className="userProfile_image" src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60" alt="" />
        <div className='ml-4 text-sm'>UserName</div>
    </div>
  )
}

export default UserProfile