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
  const [links, setLinks] = useState([]);
  const [expire, setExpire] = useState();

  const navigate = useNavigate();
  let full = useRef();

  useEffect(() => {
    setError("");
    setUrls([]);
  }, [user]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setUser(JSON.parse(token));
    } else {
      navigate("/login");
    }

    Verify();

    client
      .get("/urls", {
        headers: {
          authorization: getAuthorizationHeader(),
        },
      })
      .then((res) => {
        setLinks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const isValidUrl = (urlString) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

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

  const login = (username, password) => {
    client
      .post("/login", {
        username,
        password,
      })
      .then((res) => {
        navigate(`/`);
        window.localStorage.setItem("token", JSON.stringify(res.data));
        Verify();
        window.location.reload();
        console.log("Successfully logged in");
      })

      .catch(() => {
        setError("username or password is wrong");
      });
  };

  const signup = (username, password, passwordConfirm) => {
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

  const setValue = () => {
    if (isValidUrl(searchInput)) {
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
        links,
        setUrls,
        Verify,
        setLinks,
        expire,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
