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

  const login = (username, password) => {
    if (username && password) {
      client
        .post("/login", {
          username,
          password,
        })
        .then((res) => {
          window.localStorage.setItem("token", JSON.stringify(res.data));
          navigate(`/`);
          Verify();
          window.location.reload();
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setError("Таны нэр эсвэл нууц үг буруу байна даа");
          } else if (err.response.status === 404) {
            setError("Хэрэглэгч обсоёо");
          }
        });
    } else {
      setError("Нэр эсвэл нууц үгээ оруулчих өө хө");
    }
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
            setError("");
          })
          .catch((err) => {
            setError("Таны бичсэн нэртэй хэрэглэгч байна. Өөр нэр сонгоно уу.");
          });
      } else {
        setError("Нууц үг арай л богинохон байна шүү найза.");
      }
    } else {
      setError("Нууц үг чинь адилхан биш л байна даа");
    }
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

  return (
    <AuthContext.Provider
      value={{ login, logout, user, signup, error, expire }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
