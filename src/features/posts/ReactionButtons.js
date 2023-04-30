import React, { useState } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import useAuth from "../../hooks/useAuth";
import { useUpdatePostMutation } from "./postsApiSlice";

const reactButtons = {
  like: <ThumbUpAltOutlinedIcon />,
  heart: <FavoriteBorderRoundedIcon />,
  sad: <SentimentDissatisfiedOutlinedIcon />,
};

const ReactionButtons = ({ post, postId }) => {
  const [updateReaction] = useUpdatePostMutation();

  //const [reaction, setReaction] = useState(post);
  const { username } = useAuth();

  const removeReact = (reactName, reaction) => {
    const removeReact = reaction[reactName].filter((user) => user !== username);
    return { ...reaction, [reactName]: removeReact };
  };

  const onClickReact = (e) => {
    const name = e.target.getAttribute("name");

    let reaction = post;

    if (!post[name]?.includes(username)) {
      reaction = {
        ...reaction,
        [name]: [...post[name], username],
      };

      if (name !== "like" && post?.like?.includes(username)) {
        reaction = removeReact("like", reaction);
      }

      if (name !== "heart" && post?.heart?.includes(username)) {
        reaction = removeReact("heart", reaction);
      }

      if (name !== "sad" && post?.sad?.includes(username)) {
        reaction = removeReact("sad", reaction);
      }
    } else {
      reaction = removeReact(name, reaction);
    }
    console.log(name);

    updateReaction({ id: postId, reaction: reaction });
  };

  const reactionsButton = Object.entries(post).map(([react, num]) => (
    <div className="relative pb-5 flex justify-center">
      <button
        name={react}
        onClick={onClickReact}
        className="absolute z-10 w-10 opacity-0 "
      >
        d
      </button>
      <div className="absolute flex items-center space-x-2">
        <span className="capitalize ">{reactButtons[react]}</span>
        <span>{!num?.length ? 0 : num.length}</span>
      </div>
    </div>
  ));
  return <div className="flex justify-evenly">{reactionsButton}</div>;
};

export default ReactionButtons;
