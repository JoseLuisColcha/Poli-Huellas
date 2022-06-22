import React, { createContext, useContext, useEffect, useState } from "react";
import api from "./api";
import cookie from "js-cookie";
import translateMessage from "../constants/messages";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

function useAuthProvider() {
  const [user, setUser] = useState(null);
  const handleUser = (user) => {
    if (user) {
      setUser(user);
      cookie.set("auth", true, {
        expires: 1,
      });

      return user;
    } else {
      setUser(false);
      cookie.remove("auth");
      return false;
    }
  };

  async function register(data) {
    try {
      const response = await api.post("/register", data);
      console.log("response", response);
      handleUser(response.data);
      return response;
    } catch (error) {
      if (error.response) {
        alert(translateMessage(error.response.data.message));
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return Promise.reject(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }
  async function login(data) {
    try {
      const response = await api.post("/login", data);
      handleUser(response.data.user);
      return response;
    } catch (error) {
      if (error.response) {
        alert(translateMessage(error.response.data.message));
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }
  async function logout() {
    try {
      const response = await api.post("/logout");
      handleUser(false);
      return response;
    } catch (error) {}
  }
  async function getAuthenticatedUser() {
    try {
      const response = await api.get("/user");
      console.log("reponse user", response);
      handleUser(response.data);
      return response;
    } catch (error) {
      handleUser(false);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }

  useEffect(() => {
    console.log("RENDER AUTH", user);
    try {
      getAuthenticatedUser();
    } catch (error) {
      console.log("NO USER");
    }
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    register,
    login,
    logout,
  };
}
