import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    commentAuthorUserName: {
      type: String,
      required: true,
    },
    commentAuthorProfilePic: {
      type: String,
      required: true,
    },
    commentPostId: {
      type: String,
      required: true,
    },
    commentString: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const commentModel = mongoose.model("Comments", commentSchema);
export default commentModel;
