import style from "../style/Login.module.css";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";

export const Login = () => {
  const { login, language, error } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
                language ? "ユーザー名を入力して下さい" : "Enter your username"
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
                language
                  ? "パスワードを入力してください"
                  : "Enter your password"
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
            <Link to="/signup" style={{ color: "#02b589", fontWeight: "500" }}>
              {language
                ? "新規ユーザーはここをクリックしますか?"
                : "Шинэ хэрэглэгч бол энд дарна уу?"}
            </Link>
          </div>
        </div>
        <div className={style.footer}>
          <div>
            {language
              ? "fait avec ❤️ par Pinecone Académie"
              : "Made with ❤️ by Pinecone  Academy"}
          </div>
          <div style={{ color: "grey" }}>©boginoo.io 2023</div>
        </div>
      </div>
    </div>
  );
};
