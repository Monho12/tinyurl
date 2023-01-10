import { createContext, useState } from "react";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
    axios.get("http://localhost:7000/urls").then((res) => {
      console.log(res.data);
      setLinks(res.data);
    });
  }, []);

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

  const setValue = () => {
    if (searchInput.includes("https://")) {
      const fullUrl = full.current.value;
      axios
        .post("http://localhost:7000/urls", {
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
