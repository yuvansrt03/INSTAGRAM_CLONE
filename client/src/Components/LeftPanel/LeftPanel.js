import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import './LeftPanel.css'
function LeftPanel() {
  return (
    <div className='left_panel_container'>
        <img class="left_panel_logo" src='https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png'></img>
        <div class="left_panel_profile">
          <div class="left_panel_profile_header">
            
            <img class="left_panel_profile_image" src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
            <div class="left_panel_profile_name">Magnus Carlsen</div>
            <div class="left_panel_profile_address">California, US</div>

            <ul className='left_panel_profile_counts'>
              <li className='left_panel_profile_count'>
                <div className='left_panel_profile_count_number'>1000</div>
                <div className='left_panel_profile_count_type'>POSTS</div>
              </li>
              <li className='left_panel_profile_count'>
                <div className='left_panel_profile_count_number'>1000</div>
                <div className='left_panel_profile_count_type'>FOLLOWING</div>
              </li>
              <li className='left_panel_profile_count'>
                <div className='left_panel_profile_count_number'>1000</div>
                <div className='left_panel_profile_count_type'>FOLLOWERS</div>
              </li>
            </ul>
          </div>
          <div className="left_panel_screens">
            <button className='left_panel_screen_type'><div className='isactivebar'></div><FontAwesomeIcon icon={faHouse} className='text-lg pl-7 pr-3 isactivecolor'/><span className='text-sm font-bold isactivecolor'>Feed</span></button>
          </div>
        </div>

    </div>
  )
}

export default LeftPanel