import React from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const Comment = ({ comment }) => {
  return (
    <div className="">
      <div className="flex space-x-1 items-center">
        <img
          className="w-8 h-8 object-cover rounded-full"
          src={`images/avatar-${comment?.avatar}.jpg`}
          alt={comment?.avatar}
        />
        <h3 className="font-semibold text-sm">{comment?.user}</h3>
      </div>
      <p>{comment?.body}</p>
    </div>
  );
};

export default Comment;
