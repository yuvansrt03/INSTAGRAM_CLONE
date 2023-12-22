import mongoose from "mongoose";
import postModel from "../Models/postModel.js";
import commentModel from "../Models/commentModel.js";
export const getComments = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await commentModel.find({ commentPostId: postId });
    if (comments) {
      res.status(200).json(comments);
    } else {
      res.status(404).json("No Comments Found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const addComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    console.log(postId);
    const newComment = {
      commentPostId: postId,
      commentAuthorUserName: req.body.commentAuthorUserName,
      commentString: req.body.commentString,
      commentAuthorProfilePic: req.body.commentAuthorProfilePic,
    };
    const addCOmment = await commentModel.create(newComment);
    res.status(200).json(addCOmment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// export const deleteComment = async (req, res) => {
//   try {
//     const postId = req.params.postId;
//     const commentId = req.params.commentId;
//     const post = await postModel.findByIdAndUpdate(
//       postId,
//       { $pull: { postcomments: { _id: commentId } } },
//       { new: true }
//     );

//     if (!post) {
//       return res.status(404).json({ error: "Post not found" });
//     }
//     return res.status(200).json(post);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
