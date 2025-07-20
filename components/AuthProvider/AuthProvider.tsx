"use client";

"use client";

import { checkSession, getMe} from "../../lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const isAuthenticated = await checkSession();
        if (isAuthenticated) {
          const user = await getMe();
          setUser(user);
        }
      } catch {
        clearIsAuthenticated();
        toast("Please log in or sign up to continue.");
      }
    };
    fetchSession();
  }, [setUser, clearIsAuthenticated]);
  return children;
};

export default AuthProvider;