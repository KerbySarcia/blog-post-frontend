import React, { useEffect, useState } from "react";
import { useCreateUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import SelectAvatar from "./SelectAvatar";
const CreateAccount = () => {
  const [createUser] = useCreateUserMutation();
  const [avatar, setAvatar] = useState("two");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate("");

  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  useEffect(() => {
    setIsError(false);
  }, [username, password]);

  const onClickCreateUser = async (e) => {
    e.preventDefault();
    if (username?.length < 8) {
      setIsError(true);
      return setError("Username must greater than 8 characters");
    }

    if (password?.length < 8) {
      setIsError(true);
      return setError("Password must greater than 8 characters");
    }

    try {
      const result = await createUser({ username, password, avatar });

      if (result?.error?.status === 409) {
        setError(result.error.data.message);
        setIsError(true);
        return;
      } else if (result?.error?.status === 400) {
        setError(result.error.data.message);
        setIsError(true);
        return;
      }

      setUsername("");
      setPassword("");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pt-36 h-screen">
      <div className="p-5 bg-white m-auto max-w-md rounded-lg">
        <h1 className="text-center">Create Account</h1>
        <SelectAvatar avatar={avatar} setAvatar={setAvatar} />
        {isError && (
          <p className="text-center bg-red-300 text-red-900">{error}</p>
        )}
        <form action="" className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={username}
              onChange={handleChangeUsername}
              className="border-2 p-1"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={handleChangePassword}
              type="password"
              className="border-2 p-1"
            />
          </div>
          <button
            onClick={onClickCreateUser}
            className="w-full bg-slate-900 p-1 text-white hover:opacity-50 duration-500 rounded-md"
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
