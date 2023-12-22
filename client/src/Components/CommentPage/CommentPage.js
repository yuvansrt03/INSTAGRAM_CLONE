import React, { useEffect, useState } from "react";
import "./CommentPage.css"; // Import your CSS file for styling
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setPost } from "../../Slices/postSlice";
import LeftPanel from "../LeftPanel/LeftPanel";
import BottomNav from "../BottomNav/BottomNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const CommentPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const posts = useSelector((store) => store.post.posts);
  const feed = posts.find((obj) => obj._id === postId);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState({});
  const [isloading, setIsloading] = useState(false);
  useEffect(() => {
    const fetchComments = async () => {
      const commentsFetch = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/comments/${postId}`
      );
      const commentsResponse = await commentsFetch.json();
      console.log(commentsResponse);
      // commentsResponse.sort((a, b) => a.createdAt < b.createdAt);
      setCommentsList(commentsResponse);
      setIsloading(true);
    };
    fetchComments();
  }, []);

  const handlePostComment = async (event) => {
    event.preventDefault();
    setComment("");
    const newComment = {
      commentPostId: postId,
      commentAuthorUserName: user.userUserName,
      commentString: comment,
      commentAuthorProfilePic: user.userProfileImg,
    };
    console.log(newComment);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/comments/${postId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      }
    );
    const data = await response.json();
    setCommentsList((item) => [...item, data]);
    console.log(data);
    dispatch(setPost(data));
  };

  return (
    <>
      <div className="flex ">
        <div className="flex flex-1">
          <img
            className="cursor-pointer left_panel_logo lg:hidden"
            src="https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png"
            onClick={() => navigate("/")}
          />
        </div>
        {/* <div
          className=" lg:hidden flex justify-center items-center w-[30px] text-[30px] md:text-[25px] mr-2 cursor-pointer"
          onClick={() => navigate(`/posts/${postId}`)}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="ml-auto" />
        </div> */}
      </div>
      <LeftPanel currentpath={"explore"} />
      <BottomNav path={"explore"} />
      <div className="flex flex-col items-center justify-center w-screen">
        <div className="flex flex-col w-screen px-5 lg:w-[700px]">
          <div
            className="flex justify-center items-center w-[25px] text-[30px] mr-2 cursor-pointer my-3"
            onClick={() => navigate(`/posts/${postId}`)}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="ml-auto" />
          </div>
          <div className="add_comment_container">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={handlePostComment} className="bg-pink">
              Post
            </button>
          </div>
          <div className="mt-2 text-xl font-bold text-gray-800">Comments</div>
          <div className="p-2 mt-3 ">
            {isloading ? (
              commentsList.length > 0 ? (
                commentsList.map((comment) => (
                  <div
                    className="flex p-2 text-sm border border-l-0 border-r-0 align-center border-t-gray-400 border-b-gray-400"
                    key={comment._id}
                  >
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/assets/${comment.commentAuthorProfilePic}`}
                      className="w-10 h-10 mr-2 rounded-full"
                      alt="authorProfilePic"
                    />
                    <span className="pt-2 mr-2 font-semibold">
                      {comment.commentAuthorUserName}
                    </span>
                    <span className="pt-2">{comment.commentString}</span>
                  </div>
                ))
              ) : (
                <div className="font-bold text-center">No Comments</div>
              )
            ) : (
              <div className="text-center">Loading...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentPage;
