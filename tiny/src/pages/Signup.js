import style from "../style/Signup.module.css";
import logo from "../assets/logo.svg";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useState } from "react";

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
            {language ? "S'identifier" : "Бүртгүүлэх"}
          </div>
        </div>
        {!error && ""}
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div>
          <div className={style.inputDiv}>
            <div className={style.text2}>
              {language ? "Identifiant" : "Нэвтрэх нэр"}
            </div>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className={style.input}
              placeholder={
                language
                  ? "Entrez votre nom d'utilisateur"
                  : "enter your username"
              }
              type="text"
            />
          </div>
          <div className={style.inputDiv}>
            <div className={style.text2}>
              {language ? "Mot de passe" : "Нууц үг"}
            </div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={style.input}
              placeholder={
                language ? " tapez votre mot de passe" : "enter your password"
              }
              type="password"
            />
          </div>
          <div className={style.inputDiv}>
            <div className={style.text2}>
              {" "}
              {language
                ? "Confirmer votre mot de passe"
                : "Нууц үгээ давтна уу"}
            </div>
            <input
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className={style.input}
              placeholder={
                language
                  ? "confirmer votre mot de passe"
                  : "confirm your password"
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
            {language ? "S'identifier" : "Бүртгүүлэх"}
          </button>
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
