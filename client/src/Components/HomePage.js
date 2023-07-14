import React from 'react'
import LeftPanel from './LeftPanel/LeftPanel'
import RightPanel from './RightPanel'
import MainPanel from './MainPanel/MainPanel'
import './HomePage.css'
function HomePage() {
  return (
    <div className='homePanel flex flex-row justify-between w-full'>
        <LeftPanel/>
        <MainPanel/>
        <RightPanel/>
    </div>
  )
}

export default HomePage