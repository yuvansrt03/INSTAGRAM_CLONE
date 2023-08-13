import React ,{useState} from 'react'
import LeftPanel from './LeftPanel/LeftPanel'
import RightPanel from './RightPanel/RightPanel'
import MainPanel from './MainPanel/MainPanel'
import './HomePage.css'
function HomePage() {

  return (
    <div className='flex flex-row justify-between w-full h-max'>
        <LeftPanel currentpath={''}/>
        <MainPanel/>
        <RightPanel/>
    </div>
  )
}

export default HomePage