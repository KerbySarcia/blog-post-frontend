import React, { useState } from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useUpdatePostMutation } from "./postsApiSlice";
import useAuth from "../../hooks/useAuth";

const AddComment = ({ id }) => {
  const [comment, setComment] = useState("");
  const [updatePost] = useUpdatePostMutation("");
  const handleChangeComment = (e) => setComment(e.target.value);
  const { username, avatar } = useAuth();

  const onKeyPress = async (e) => {
    if (e.key === "Enter") {
      if (comment) {
        const commentProperties = {
          user: username,
          body: comment,
          avatar,
        };
        try {
          await updatePost({ id, comment: commentProperties });
        } catch (err) {
          console.log(err);
        }
      }
      setComment("");
    }
  };

  return (
    <div className="flex p-5 ">
      <img
        className="w-8 h-8 object-cover rounded-full cursor-pointer"
        src={`images/avatar-${avatar}.jpg`}
        alt="avatar"
      />
      <input
        type="text"
        className="flex-1 ml-2 pl-2 text-black"
        placeholder="Comment..."
        onKeyDownCapture={onKeyPress}
        value={comment}
        onChange={handleChangeComment}
      />
    </div>
  );
};

export default AddComment;
