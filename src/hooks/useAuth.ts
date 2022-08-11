import { useContext } from "react";
import { AuthLoginValues } from "../interfaces";
import { authLogin } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const loginUser = async (user: AuthLoginValues) => {
    try {
      const { data } = await authLogin(user);
      if (data.token) {
        sessionStorage.removeItem("idToken");
        sessionStorage.setItem("idToken", data.token);
        setUser({
          logged: true,
        });
      }
    } catch (error: any) {
      const dataError = error.response.data;
      return {
        error: true,
        message: dataError.message || "Error",
      };
    }
  };

  const logout = () => {
    sessionStorage.removeItem("idToken");
    setUser({
      logged: false,
      email: "",
      name: "",
    });
  };

  return {
    user,
    loginUser,
    logout,
  };
};
