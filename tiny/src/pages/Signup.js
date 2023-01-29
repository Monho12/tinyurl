import style from "../style/Signup.module.css";
import logo from "../assets/logo.svg";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useState } from "react";
import { Footer } from "../components";

export const Signup = () => {
  const { signup, error, language } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <div>
          <img src={logo} alt="logo" />
          <div className={style.text}>
            {language ? "サインアップ" : "Бүртгүүлэх"}
          </div>
        </div>
        {!error && ""}
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div>
          <div className={style.inputDiv}>
            <div className={style.text2}>
              {language ? "ユーザー名" : "Нэвтрэх нэр"}
            </div>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className={style.input}
              placeholder={
                language ? "ユーザー名を入力して下さい" : "enter your username"
              }
              type="text"
            />
          </div>
          <div className={style.inputDiv}>
            <div className={style.text2}>
              {language ? "パスワード" : "Нууц үг"}
            </div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={style.input}
              placeholder={
                language
                  ? "パスワードを入力してください"
                  : "enter your password"
              }
              type="password"
            />
          </div>
          <div className={style.inputDiv}>
            <div className={style.text2}>
              {" "}
              {language ? "あなたのパスワードを確認" : "Нууц үгээ давтна уу"}
            </div>
            <input
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className={style.input}
              placeholder={
                language ? "あなたのパスワードを確認" : "confirm your password"
              }
              type="password"
            />
          </div>
        </div>
        <div className={style.buttonSection}>
          <button
            className={style.button}
            onClick={() => signup(username, password, passwordConfirm)}
          >
            {language ? "サインアップ" : "Бүртгүүлэх"}
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
};
