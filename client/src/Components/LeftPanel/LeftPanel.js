import React, { useState } from 'react'

import './LeftPanel.css'
import { useDispatch, useSelector } from 'react-redux'
import { ExploreNavigation, HomeNavigation } from '../LeftPanelNavigations/LeftPanelNavigations'
import { useNavigate } from 'react-router-dom';
function LeftPanel({currentpath}) {
  const [path,setPath]=useState(currentpath)
  const navigate = useNavigate();
  const user=useSelector(store=>store.auth.user)
  const posts=useSelector(store=>store.post.posts);
  const userPosts=posts.filter(item=>item.postAuthorId==user._id);
  const objectSize = Object.keys(userPosts).length;
  const handleLogoClick=()=>{
    navigate('/')
  }
  const handleViewUser=()=>{
    navigate(`/users/${user._id}`);
  }
  const handleSetPath=(settingpath)=>{
    console.log(settingpath);
    setPath(path=>settingpath);
    navigate(`/${settingpath}`);
  }
  return (
    <div className='left_panel_container'>
        <img className="left_panel_logo cursor-pointer" src='https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png' onClick={handleLogoClick}></img>
        <div className="left_panel_profile">
          <div className="left_panel_profile_header">
            <div className='flex flex-col justify-center items-center cursor-pointer' onClick={handleViewUser}>
              <img className="left_panel_profile_image" src={`http://localhost:5000/assets/${user.userProfileImg}`}></img>
              <div className="left_panel_profile_name">{user.userUserName}</div>
              <div className="left_panel_profile_address">@{user.userName}</div>
            </div>

            <ul className='left_panel_profile_counts'>
              <li className='left_panel_profile_count'>
                <div className='left_panel_profile_count_number'>{objectSize}</div>
                <div className='left_panel_profile_count_type'>POSTS</div>
              </li>
              <li className='left_panel_profile_count'>
                <div className='left_panel_profile_count_number'>{user.userFollowing.length}</div>
                <div className='left_panel_profile_count_type'>FOLLOWING</div>
              </li>
              <li className='left_panel_profile_count'>
                <div className='left_panel_profile_count_number'>{user.userFollowers.length}</div>
                <div className='left_panel_profile_count_type'>FOLLOWERS</div>
              </li>
            </ul>
          </div>
          <div className="left_panel_screens">
            <HomeNavigation handleSetPath={()=>{handleSetPath('')}} isActive={path===''}/>
            <ExploreNavigation  handleSetPath={()=>handleSetPath('explore')} isActive={path==='explore'}/>
          </div>
        </div>

    </div>
  )
}

export default LeftPanel