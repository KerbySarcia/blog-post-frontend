import React from "react";
import AddPost from "./AddPost";
import PostList from "./PostList";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { username } = useAuth();
  return (
    <div className=" px-5 pt-28 max-w-2xl m-auto sm:px-0">
      <h1 className="mb-5 font-bold text-2xl">Hello! {username} 👋</h1>
      <AddPost />
      <PostList />
    </div>
  );
};

export default Home;
