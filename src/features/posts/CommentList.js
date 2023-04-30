import React from "react";
import Comment from "./Comment";

const CommentList = ({ comments, id }) => {
  const commentElements = comments.map((comment) => (
    <Comment key={id} comment={comment} />
  ));
  return <div className="p-5 space-y-5 ">{commentElements}</div>;
};

export default CommentList;
