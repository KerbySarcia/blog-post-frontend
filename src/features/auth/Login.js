import React, { useEffect, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState("");

  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  useEffect(() => {
    setIsError(false);
  }, [username, password]);

  const onClickLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ username, password });
      dispatch(setCredentials({ ...result.data }));

      if (result?.error?.status === 401) {
        setError(result?.error?.data?.message);
        setIsError(true);
        return;
      } else if (result?.error?.status === 400) {
        setError(result?.error?.data?.message);
        setIsError(true);
        return;
      }
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen pt-20">
      <div className="p-4 rounded-lg  m-auto bg-white  flex flex-col max-w-sm mt-20 space-y-5">
        <h1 className="text-center text-2xl">Login</h1>
        {isError && (
          <p
            className="bg-red-200 text-red-800 p-2 text-center  rounded
            "
          >
            {error}
          </p>
        )}
        <form action="" className="space-y-5 p-2">
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              onChange={handleChangeUsername}
              value={username}
              autoComplete="off"
              type="text"
              id="username"
              className="border-2 p-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChangePassword}
              value={password}
              type="password"
              id="password"
              className="border-2 p-1"
            />
          </div>
          <button
            onClick={onClickLogin}
            className="w-full bg-slate-900 text-white p-1 rounded hover:opacity-50 transition-all duration-500"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/create")}
            className="w-full bg-slate-900 text-white p-1 rounded hover:opacity-50 transition-all duration-500"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
