import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse,faCompass } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import classnames from 'classnames'
export const HomeNavigation=({handleSetPath,isActive})=>{
    const navigate=useNavigate();
    const spanClass = classnames('text-sm font-bold', {
        'isactivecolor': isActive,
        'text-black': !isActive,
    });
    const iconClass = classnames('pr-3 text-lg pl-7', {
        'isactivecolor': isActive,
        'text-black': !isActive,
    });
    const divClass = classnames('bg-gray-500', {
        'isactivebar': isActive,
        'isunactivebar': !isActive,
    });
    const handleClick=()=>{
        handleSetPath('home');        
        navigate('/');
    }
    return(
        <button className='left_panel_screen_type mt-2' onClick={handleSetPath}>
            <div className={divClass}></div>
            <FontAwesomeIcon icon={faHouse} className={iconClass}/>
            <span className={spanClass}>Feed</span>
        </button>
    )
}
export const ExploreNavigation=({handleSetPath,isActive})=>{
    console.log("from exploreNav ",isActive);
    const spanClass = classnames('text-sm font-bold', {
        'isactivecolor': isActive,
        'text-gray-600': !isActive,
    });
    const iconClass = classnames('pr-3 text-lg pl-7', {
        'isactivecolor': isActive,
        'text-gray-600': !isActive,
    });
    const divClass = classnames('bg-black', {
        'isactivebar': isActive,
        'isunactivebar': !isActive,
    });
    return (
        <button className='left_panel_screen_type' onClick={handleSetPath}>
            <div className={divClass}></div>
            <FontAwesomeIcon icon={faCompass} className={iconClass}/>
            <span className={spanClass}>Explore</span>
        </button>
    )
}