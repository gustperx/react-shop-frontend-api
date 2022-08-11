import { useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "./context/AuthContext";
import { AuthUser } from "./interfaces";
import { MainRouter } from "./routers";
import { checkAuth } from "./services/authService";

const queryClient = new QueryClient();

export const App = () => {
  const [user, setUser] = useState<AuthUser>({ logged: false });

  const checkStatus = async () => {
    try {
      const res = await checkAuth();
      if (res.status === 200) {
        setUser({
          logged: true,
        });
      } else {
        setUser({
          logged: false,
        });
      }
    } catch (error) {
      setUser({
        logged: false,
      });
    }
  };

  useMemo(() => checkStatus(), []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <MainRouter />
        <ToastContainer />
      </QueryClientProvider>
    </AuthContext.Provider>
  );
};
