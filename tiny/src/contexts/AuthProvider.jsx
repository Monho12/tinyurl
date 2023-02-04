import { createContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { client, getAuthorizationHeader } from "../client";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [expire, setExpire] = useState();

  const navigate = useNavigate();

  const Verify = () => {
    client
      .get("/verify", {
        headers: {
          authorization: getAuthorizationHeader(),
        },
      })
      .then((res) => {
        console.log(res.data.user);
        setUser(res.data.user);
        setExpire(res.data.exp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setError("");
  }, [user]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setUser(JSON.parse(token));
    } else {
      navigate("/login");
    }
    Verify();
  }, []);

  const login = (username, password) => {
    if (!username || !password) {
      setError("Please enter a username or password");
    }
    client
      .post("/login", {
        username,
        password,
      })
      .then((res) => {
        navigate(`/`);
        window.localStorage.setItem("token", JSON.stringify(res.data));
        window.location.reload();
        console.log("Successfully logged in");
      })
      .catch(() => {
        setError("username or password is wrong");
      });
  };

  const signup = (username, password, passwordConfirm) => {
    if (!username && !password)
      return setError("Username or password required");
    if (password === passwordConfirm) {
      if (password.length >= 6) {
        client
          .post("/signup", {
            username: username,
            password: password,
            passwordConfirm: passwordConfirm,
          })
          .then(() => {
            navigate(`/login`);
          })
          .catch(() => {
            setError("Username already in use mate");
          });
      } else {
        setError("Your password is too short");
      }
    } else {
      setError("Passwords do not match");
    }
  };

  const logout = () => {
    navigate("/login");
    setUser(null);
    window.localStorage.removeItem("token");
    console.log("logged out");
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, user, signup, error, expire }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
