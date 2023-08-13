import React, { useEffect, useState } from 'react'
import LeftPanel from '../LeftPanel/LeftPanel'
import RightPanel from '../RightPanel/RightPanel'
import ProfilePosts from '../ProfilePage/ProfilePosts'
import './ExplorePanel.css'
function ExplorePanel() {
  const [isLoading,setIsLoading]=useState(true);
  const [posts,setPosts]=useState(null);
  useEffect(()=>{
    async function fetchPosts(){
      try{
        const response = await fetch(`http://localhost:5000/posts`);
        const data=await response.json();
        setPosts(data);
        setIsLoading(false)
      }catch(error){
        console.log({error:error.message})
        setIsLoading(false);
      }
    }
    fetchPosts();
  })
  return (
    <div className='explore_panel flex flex-row'>
      {
        isLoading?<>Loading</>:
        <div className='w-[100vw]'>
          <LeftPanel currentpath={'explore'}/>
          <>
            <h1 className='ml-[250px] px-[20px] pt-5 text-xl font-extrabold '>For You</h1>
            <div className='explore_container flex-1 flex'>
            {posts.map(item=><ProfilePosts item={item}/>)}
            </div>
          </>
        </div>
      }
    </div>
  ) 
}

export default ExplorePanel