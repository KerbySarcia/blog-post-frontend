import React, { useState } from "react";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Header = () => {
  const [modal, setModal] = useState(false);
  const [logout] = useLogoutMutation();
  const { username, roles, avatar } = useAuth();

  const navigate = useNavigate();

  const onClickLogout = async () => {
    try {
      setModal(false);
      await logout();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-200  p-5 fixed w-full z-10">
      <div className="max-w-2xl flex items-center justify-between m-auto">
        <Link to={"/"}>
          <h1 className="uppercase font-bold">Blog Post</h1>
        </Link>
        {roles?.length ? (
          <div className="relative">
            <img
              className="w-11 h-11 object-cover rounded-full cursor-pointer"
              src={`images/avatar-${avatar}.jpg`}
              alt="avatar"
              onClick={() => setModal((value) => !value)}
            />
            <div
              className={`${
                !modal && "hidden"
              } absolute right-0 top-12 rounded-md bg-white p-3`}
            >
              <button
                onClick={onClickLogout}
                className="font-semibold bg-slate-900 px-2 py-1 rounded hover:opacity-50 duration-500"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Header;
