import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Feeds from '../MainPanel/Feeds';
import LeftPanel from '../LeftPanel/LeftPanel';
function IndividualPost() {
  const {postId}=useParams();
  const [isLoading,setIsLoading]=useState(true);
  const [feed,setFeed]=useState([])
  useEffect(()=>{
    async function fetchPost(){
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/posts/${postId}`);
          const jsonData = await response.json();
          setFeed(jsonData);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        }
      };
  
      fetchData();
    }
    fetchPost();
  },[]);

  return (
    <>
      {isLoading?<>Loading</>:
        <div className='w-screen flex overflow-y-hidden'>
          <LeftPanel currentpath={'explore'}/>
          <div className='m-auto'>
            <Feeds feed={feed}/>
          </div>
        </div>
      }
    </>
  )
}

export default IndividualPost