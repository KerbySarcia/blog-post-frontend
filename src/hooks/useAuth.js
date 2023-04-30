import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";
const useAuth = () => {
  const token = useSelector(selectToken);

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles, avatar } = decoded.UserInfo;

    return { username, roles, token, avatar };
  }

  return { roles: [], username: "" };
};

export default useAuth;
