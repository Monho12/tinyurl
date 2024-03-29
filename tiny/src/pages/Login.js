import style from "../style/Login.module.css";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Footer } from "../components";
import { StateContext } from "../contexts/StateProvider";
import { client } from "../client";

export const Login = () => {
  const { error, setError, Verify } = useContext(AuthContext);
  const { language } = useContext(StateContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = (username, password) => {
    if (username && password) {
      client
        .post("/login", {
          username,
          password,
        })
        .then((res) => {
          navigate(`/`);
          Verify();
          window.localStorage.setItem("token", JSON.stringify(res.data));
          setError("");
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

  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <div>
          <img src={logo} alt="logo" style={{ textAlign: "center" }} />
          <div className={style.text}>
            {language ? "ログインする" : "Нэвтрэх"}
          </div>
        </div>
        {!error && ""}
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div>
          <div className={style.inputDiv}>
            <div className={style.text2}>{language ? "名前" : "Нэр"}</div>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className={style.input}
              placeholder={
                language ? "ユーザー名を入力して下さい" : "Нэвтрэх нэр"
              }
              type="text"
            />
          </div>
          <div className={style.inputDiv}>
            <div className={style.text2}>
              {language ? "パスワード" : "Нууц үг"}
            </div>
            <input
              className={style.input}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                language ? "パスワードを入力してください" : "Нууц үг"
              }
              type="password"
            />
          </div>
        </div>
        <div className={style.secondInput}>
          <div className={style.checkbox}>
            <input type="checkbox" style={{ width: "18px", height: "18px" }} />
            {language ? "私を覚えてますか" : "Намайг сана"}
          </div>

          <div>
            <Link to="/forgotpass" style={{ color: "black" }}>
              {language ? "パスワードをお忘れですか" : " Нууц үгээ мартсан "}
            </Link>
          </div>
        </div>
        <div className={style.buttonSection}>
          <button
            className={style.button}
            onClick={() => login(username, password)}
          >
            {language ? "ログインする" : "Нэвтрэх"}
          </button>
          <div>
            <Link
              to="/signup"
              onClick={() => setError("")}
              style={{ color: "#02b589", fontWeight: "500" }}
            >
              {language
                ? "新規ユーザーはここをクリックしますか?"
                : "Шинэ хэрэглэгч бол энд дарна уу?"}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
