import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faSearch } from '@fortawesome/free-solid-svg-icons'
import Feeds from './Feeds'
import Stories from './Stories'
import './MainPanel.css'
function MainPanel() {
  return (
    <div className="flex-1 main_panel">

      <div className='main_panel_search_section'>
        <div className='rounded-full main_panel_search_bar'>
            <FontAwesomeIcon icon={faSearch} style={{color: "#acacac",}} />
            <input type="text" placeholder='Search'/>
        </div>
        <button className="text-sm rounded-full main_panel_create_button">
          <FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} />
          <span className='text'>Create New Post</span>
        </button>
      </div>

      <div className="main_panel_main_section_background">
        <div className="main_panel_main_section_container">
          <div className="main_panel_stories_section">
            <Stories/>
            <Stories/>
            <Stories/>
            <Stories/>
            <Stories/>
            <Stories/>
            <Stories/>
          </div>
          <div className="main_panel_feeds_section">
            <Feeds/>
            {/* <Feeds/>
            <Feeds/>
            <Feeds/> */}
            {/* <Feeds/>
            <Feeds/> */}
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default MainPanel