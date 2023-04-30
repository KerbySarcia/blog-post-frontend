import React, { useState } from "react";
import { useAddPostMutation } from "./postsApiSlice";
import useAuth from "../../hooks/useAuth";

const AddPost = () => {
  const { username, avatar } = useAuth();

  const [addPost] = useAddPostMutation();

  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleChangeBody = (e) => setBody(e.target.value);

  const canSave = Boolean(body) && Boolean(title);
  const onClickPost = async () => {
    try {
      await addPost({ title, body, username, avatar }).unwrap();
      setTitle("");
      setBody("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="">
      <form action="" className="space-y-3">
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            onChange={handleChangeTitle}
            value={title}
            type="text"
            id="title"
            className="border-2 p-1 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="body">Body</label>
          <textarea
            onChange={handleChangeBody}
            value={body}
            name=""
            id="body"
            className="p-1 h-48 border-2 resize-none  rounded-md"
          />
        </div>
      </form>
      <button
        disabled={!canSave}
        onClick={onClickPost}
        className={`${
          !canSave && "opacity-50"
        } my-3 bg-slate-900 text-white py-1 px-3 rounded`}
      >
        Add Post
      </button>
    </div>
  );
};

export default AddPost;
