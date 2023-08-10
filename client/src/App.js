import React from 'react'
import HomePage from './Components/HomePage'
import {Route,Routes} from 'react-router-dom'
import LoginPage from './Components/LoginPage/LoginPage'
import RegisterPage from './Components/RegisterPage/RegisterPage'
import { useSelector } from 'react-redux'
import CreatePost from './Components/CreatePost/CreatePost'
import CommentPage from './Components/CommentPage/CommentPage'
import ProfilePage from './Components/ProfilePage/ProfilePage'
import ExplorePanel from './Components/ExplorePanel/ExplorePanel'
function App() {
  const authState=useSelector(store=>store.auth);
  return (
    <div>
      <Routes>
        <Route path="/" element={authState.isAuthenticated? <HomePage/>:<LoginPage/>}/>
        <Route path="register" element={<RegisterPage/>}/>
        <Route path='createPost' element={<CreatePost/>}/>
        <Route exact path="/comment/:postId" element={<CommentPage/>} />
        <Route path="/profilePage/:userId" element={<ProfilePage/>}></Route>
        <Route path='/explore' element={<ExplorePanel/>}/>
      </Routes>
    </div>
  )
}

export default App