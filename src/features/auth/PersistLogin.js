import React, { useEffect, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "./authSlice";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PersistLogin = () => {
  const token = useSelector(selectToken);
  const [refresh, { isLoading, isSuccess, isError, error }] =
    useRefreshMutation();
  const [success, setSuccess] = useState();
  const location = useLocation;
  useEffect(() => {
    const refreshToken = async () => {
      try {
        await refresh();
        setSuccess(true);
      } catch (err) {
        console.log(err);
      }
    };

    !token && refreshToken();
  }, []);

  let content = null;
  if (isLoading)
    content = <p className="h-screen text-center pt-20">Loading...</p>;
  else if (token) content = <Outlet />;
  else if (success && isSuccess) content = <Outlet />;
  else if (isError)
    // content = (
    //   <div className="h-screen pt-20 text-center">
    //     <p className="bg-red-300 w-fit p-2 m-auto text-red-900 rounded">
    //       {error.data.message}
    //     </p>
    //   </div>
    // );
    // content = <Outlet />;

    return <Navigate to={"/login"} />;
  return content;
};

export default PersistLogin;
