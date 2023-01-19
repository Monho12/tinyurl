import { createContext, useState } from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { client, getAuthorizationHeader } from "../client";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [urls, setUrls] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [toggle, setToggle] = useState(false);
  const [links, setLinks] = useState([]);
  const [language, setLanguage] = useState(false);

  const navigate = useNavigate();
  let full = useRef();

  useEffect(() => {
    setError("");
  }, [user]);

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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const login = (username, password) => {
    client
      .post("/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log("Successfully logged in");
        window.localStorage.setItem("token", JSON.stringify(res.data));
        Verify();
        navigate(`/`);
      })
      .catch(() => {
        setError("Username or password is wrong");
      });
  };

  const signup = (username, password, passwordConfirm) => {
    if (password === passwordConfirm) {
      client
        .post("/signup", {
          username: username,
          password: password,
          passwordConfirm: passwordConfirm,
        })
        .then((res) => {
          navigate(`/login`);
        })
        .catch((error) => {
          setError("Username already in use mate");
        });
    } else {
      setError("Passwords do not match");
    }
  };

  const setValue = () => {
    if (searchInput.includes("https://")) {
      const fullUrl = full.current.value;
      client
        .post("/urls", {
          full: fullUrl,
          Creator: user._id,
        })
        .then((res) => {
          console.log(res.data);
          setUrls([res.data]);
          setLinks([...links, res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please enter a valid URL");
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
    window.localStorage.removeItem("token");
    console.log("logged out");
  };

  useEffect(() => {
    Verify();
    const token = window.localStorage.getItem("token");
    if (token) {
      setUser(JSON.parse(token));
    } else {
      navigate("/login");
    }

    client.get("/urls").then((res) => {
      console.log(res.data);
      setLinks(res.data);
      if (res.data.message) {
        navigate("/login");
        window.localStorage.removeItem("token");
        setUser(null);
        console.log("token expired");
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setValue,
        login,
        logout,
        user,
        signup,
        error,
        urls,
        full,
        setSearchInput,
        setUrls,
        toggle,
        setToggle,
        links,
        setLanguage,
        language,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
