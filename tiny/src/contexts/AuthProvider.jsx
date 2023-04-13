import { createContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { client, getAuthorizationHeader } from "../client";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const Verify = () => {
    client
      .get("/verify", {
        headers: {
          authorization: getAuthorizationHeader(),
        },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setUser(JSON.parse(token));
    } else {
      navigate("/login");
    }
    Verify();
  }, []);

  const logout = () => {
    navigate("/login");
    setUser(null);
    window.localStorage.removeItem("token");
  };

  useEffect(() => {
    setError("");
  }, [user]);

  return (
    <AuthContext.Provider value={{ logout, user, error, setError, Verify }}>
      {props.children}
    </AuthContext.Provider>
  );
};
