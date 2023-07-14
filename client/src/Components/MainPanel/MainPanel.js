import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faSearch } from '@fortawesome/free-solid-svg-icons'
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

      <div className="main_panel_main_section">
        <h2 className='float-left text-2xl font-bold '>Stories</h2>
        <div className="main_panel_stories_section">
          <img class="main_panel_story_part" src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
          <img class="main_panel_story_part" src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
          <img class="main_panel_story_part" src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
          <img class="main_panel_story_part" src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
          <img class="main_panel_story_part" src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
          <img class="main_panel_story_part" src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
          <img class="main_panel_story_part" src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
        </div>
      </div>
    </div>
  )
}

export default MainPanel