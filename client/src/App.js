import React from "react";
import HomePage from "./Components/HomePage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Components/LoginPage/LoginPage";
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import { useSelector } from "react-redux";
import CreatePost from "./Components/CreatePost/CreatePost";
import CommentPage from "./Components/CommentPage/CommentPage";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import ExplorePanel from "./Components/ExplorePanel/ExplorePanel";
import IndividualPost from "./Components/IndividualPost/IndividualPost";
import ChatPage from "./Components/ChatPage/ChatPage";
import IndividualChat from "./Components/ChatPage/IndividualChat/IndividualChat";
import NotFound from "./Components/NotFound/NotFound";
import SearchPage from "./Components/SearchPage/SearchPage";
function App() {
  const authState = useSelector((store) => store.auth);
  return (
    <Routes>
      <Route
        path="/"
        element={authState.isAuthenticated ? <HomePage /> : <LoginPage />}
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/createPost" element={<CreatePost />} />
      <Route exact path="/comment/:postId" element={<CommentPage />} />
      <Route path="/users/:userId" element={<ProfilePage />}></Route>
      <Route path="/explore" element={<ExplorePanel />} />
      <Route path="/posts/:postId" element={<IndividualPost />}></Route>
      <Route path="/chats" element={<ChatPage />}></Route>
      <Route path="/chatPage/:userId/:friendId" element={<IndividualChat />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
