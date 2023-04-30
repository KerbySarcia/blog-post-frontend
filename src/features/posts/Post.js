import React, { useState } from "react";
import { useGetPostsQuery } from "./postsApiSlice";
import ReactionButtons from "./ReactionButtons";
import useAuth from "../../hooks/useAuth";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useDeletePostMutation } from "./postsApiSlice";
import TimeAgo from "./TimeAgo";
let Post = ({ postId }) => {
  const [modal, setModal] = useState(false);

  const { post } = useGetPostsQuery("getPosts", {
    selectFromResult: ({ data }) => ({ post: data?.entities[postId] }),
  });

  const [deletePost] = useDeletePostMutation();

  const { username } = useAuth();
  let content = null;

  if (post) {
    const { title, body, time, reactions, user, id, comments, avatar } = post;

    content = (
      <div className=" rounded-lg  bg-slate-900 text-slate-200 ">
        <div className="space-y-3 p-5  mt-10 ">
          <div className="flex justify-between">
            <div className="flex space-x-2 font-bold">
              <img
                className="w-8 h-8 object-cover rounded-full"
                src={`images/avatar-${avatar}.jpg`}
                alt={avatar}
              />
              <h1>{user}</h1>
            </div>
            {username === user && (
              <DeleteOutlineRoundedIcon
                onClick={() => setModal(true)}
                className="hover:text-red-400 cursor-pointer"
              />
            )}
          </div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className=" text-justify">{body}</p>
          <TimeAgo timestamp={time} />
          <ReactionButtons postId={id} post={reactions} />
        </div>
        <div className=" rounded-b-lg bg-slate-800">
          {comments?.length > 0 && <CommentList comments={comments} id={id} />}
          <div className="border-b-2 opacity-50" />
          <AddComment id={id} />
        </div>
        {modal && (
          <div className="flex justify-center items-center fixed top-0 left-0 h-screen w-screen  bg-black/25">
            <div className=" bg-white text-black p-5 space-y-5  rounded-sm">
              <h1>Are you sure you want to delete? 😥</h1>
              <div className="text-center space-x-4">
                <button
                  onClick={async () => {
                    await deletePost({ id });
                    setModal(false);
                  }}
                  className="bg-slate-900 text-white px-5 rounded-sm hover:opacity-50 duration-200"
                >
                  Yes
                </button>
                <button
                  className="bg-slate-900 text-white px-5 rounded-sm hover:opacity-50 duration-200"
                  onClick={() => setModal((val) => !val)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return <div className={`${content === null && "h-screen"}`}>{content}</div>;
};
Post = React.memo(Post);
export default Post;
