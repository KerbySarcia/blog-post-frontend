import React from "react";
import Post from "./Post";
import { useGetPostsQuery } from "./postsApiSlice";
const PostList = () => {
  const {
    data: posts,
    isError,
    isLoading,
    error,
    isSuccess,
  } = useGetPostsQuery("getPosts");

  let content = null;
  if (isLoading) {
    content = <p className="h-screen text-center">Loading...</p>;
  } else if (isSuccess) {
    content = posts.ids.map((id) => <Post key={id} postId={id} />);
  } else if (isError) {
    content = <p>{error.data.message}</p>;
  }

  return (
    <div className="pb-5">
      <h1 className="font-bold text-2xl">Posts</h1>
      {content}
    </div>
  );
};

export default PostList;
