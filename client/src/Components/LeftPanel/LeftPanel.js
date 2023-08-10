import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse,faCompass } from '@fortawesome/free-solid-svg-icons'
import './LeftPanel.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
function LeftPanel() {
  const navigate = useNavigate();
  const user=useSelector(store=>store.auth.user)
  const posts=useSelector(store=>store.post.posts);
  const userPosts=posts.filter(item=>item.postAuthorId==user._id);
  const objectSize = Object.keys(userPosts).length;
  return (
    <div className='left_panel_container'>
        <img className="left_panel_logo" src='https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png'></img>
        <div className="left_panel_profile">
          <div className="left_panel_profile_header">
            
            <img className="left_panel_profile_image" src={`http://localhost:5000/assets/${user.userProfileImg}`}></img>
            <div className="left_panel_profile_name">{user.userUserName}</div>
            <div className="left_panel_profile_address">@{user.userName}</div>

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
            <button className='left_panel_screen_type' onClick={()=>navigate('/')}><div className='isactivebar'></div><FontAwesomeIcon icon={faHouse} className='pr-3 text-lg pl-7 isactivecolor'/><span className='text-sm font-bold isactivecolor'>Feed</span></button>
            <button className='left_panel_screen_type' onClick={()=>navigate('/explore')}><div className='isactivebar'></div><FontAwesomeIcon icon={faCompass} className='pr-3 text-lg pl-7 isactivecolor'/><span className='text-sm font-bold isactivecolor'>Explore</span></button>
          </div>
        </div>

    </div>
  )
}

export default LeftPanel