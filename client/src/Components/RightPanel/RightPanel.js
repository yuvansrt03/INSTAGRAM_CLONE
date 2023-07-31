import React from 'react'
import './RightPanel.css'
import UserProfile from '../UserProfile/UserProfile'
function RightPanel() {
  return (
    <div className="right_panel_container">
      <div className="right_panel_user_profile">
        <UserProfile></UserProfile>
      </div>
      <div><p className='mt-5 font-bold'>Suggested for You</p></div>
      <div className="right_panel_friends">
        <UserProfile></UserProfile>
        <UserProfile></UserProfile>
        <UserProfile></UserProfile>
        <UserProfile></UserProfile>
      </div>
    </div>
  )
}

export default RightPanel