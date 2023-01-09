import { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  console.log(user);

  const navigate = useNavigate();

  const login = (username, password) => {
    axios
      .post("http://localhost:7000/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        setUser(res.data);
        window.localStorage.setItem("credentials", JSON.stringify(res.data));
        navigate(`/`);
      });
  };

  const signup = (username, password, passwordConfirm) => {
    if (password === passwordConfirm) {
      axios
        .post("http://localhost:7000/signup", {
          username: username,
          password: password,
          passwordConfirm: passwordConfirm,
        })
        .then((res) => {
          setUser(res.data);
          window.localStorage.setItem("credentials", JSON.stringify(res.data));
          navigate(`/`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setError("Passwords do not match");
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
    window.localStorage.removeItem("credentials");
    console.log("logged out");
  };

  useEffect(() => {
    const credentials = window.localStorage.getItem("credentials");
    if (credentials) {
      setUser(JSON.parse(credentials));
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        signup,
        error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
