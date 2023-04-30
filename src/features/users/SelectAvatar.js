import React, { useState } from "react";

const SelectAvatar = ({ avatar, setAvatar }) => {
  const [open, setOpen] = useState(false);

  const handleModal = () => setOpen((value) => !value);
  const setAvatarNumber = (e) => {
    setAvatar(e.target.name);
  };
  return (
    <div>
      <div
        onClick={handleModal}
        className="w-fit relative m-auto mt-5 cursor-pointer"
      >
        <img
          src={`images/avatar-${avatar}.jpg`}
          className="w-36 h-36 object-cover"
          alt=""
        />
        <h2 className="bg-black/50 text-center bottom-0 text-white absolute w-full">
          Select Avatar
        </h2>
      </div>
      <div
        onClick={handleModal}
        className={`${
          open ? "" : "hidden"
        } absolute top-0 left-0 bg-black/50 h-full w-full`}
      >
        <div className="grid w-fit grid-cols-2 gap-2 mt-48 mx-auto bg-white p-3 rounded-sm">
          <img
            className="w-36 h-36 object-cover cursor-pointer hover:opacity-50 duration-500"
            src="images/avatar-one.jpg"
            alt="avatar-one"
            name="one"
            onClick={setAvatarNumber}
          />
          <img
            className="w-36 h-36 object-cover cursor-pointer hover:opacity-50 duration-500"
            src="images/avatar-two.jpg"
            alt="avatar-two"
            name="two"
            onClick={setAvatarNumber}
          />
          <img
            className="w-36 h-36 object-cover cursor-pointer hover:opacity-50 duration-500"
            src="images/avatar-three.jpg"
            alt="avatar-three"
            name="three"
            onClick={setAvatarNumber}
          />
          <img
            className="w-36 h-36 object-cover cursor-pointer hover:opacity-50 duration-500"
            src="images/avatar-four.jpg"
            alt="avatar-four"
            name="four"
            onClick={setAvatarNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectAvatar;
