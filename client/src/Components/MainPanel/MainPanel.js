import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faSearch } from '@fortawesome/free-solid-svg-icons'
import Feeds from './Feeds'
import Stories from './Stories'
import './MainPanel.css'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../Slices/postSlice'
function MainPanel() {
  const dispatch=useDispatch();
  const postData=useSelector(store=>store.post.posts)
  console.log("asdfafdasfdasfafafsdfdssads")
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/posts')
      const jsonData = await response.json();
      dispatch(setPosts(jsonData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
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
          </div>
          <div className="main_panel_feeds_section">
            {postData.map(feed=><Feeds key={feed._id} feed={feed}></Feeds>)}
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default MainPanel