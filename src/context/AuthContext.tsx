import { createContext } from "react";
import { AuthContextInterface } from "../interfaces";

export const AuthContext = createContext<AuthContextInterface>({
  user: {
    logged: false,
  },
  setUser: () => {},
});
