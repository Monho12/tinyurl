import style from "../style/Login.module.css";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";

export const Login = () => {
  const { login, language } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <div>
          {/* logoSection */}
          <img src={logo} alt="logo" style={{ textAlign: "center" }} />
          <div className={style.text}>{language ? "Connexion" : "Нэвтрэх"}</div>
        </div>

        <div>
          {/* InputSection */}
          <div className={style.inputDiv}>
            <div className={style.text2}>{language ? "Nom" : "Нэр"}</div>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className={style.input}
              placeholder={
                language
                  ? "Entrez votre nom d'utilisateur"
                  : "Enter your username"
              }
              type="text"
            />
          </div>
          <div className={style.inputDiv}>
            <div className={style.text2}>
              {language ? "Mot de passe" : "Нууц үг"}
            </div>
            <input
              className={style.input}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                language ? " tapez votre mot de passe" : "Enter your password"
              }
              type="password"
            />
          </div>
        </div>
        <div className={style.secondInput}>
          <div className={style.checkbox}>
            <input type="checkbox" style={{ width: "18px", height: "18px" }} />
            {language ? " souviens-toi de moi" : "Намайг сана"}
          </div>

          <div>
            <Link to="/forgotpass" style={{ color: "black" }}>
              {language ? "mot de passe oublié" : " Нууц үгээ мартсан "}
            </Link>
          </div>
        </div>
        <div className={style.buttonSection}>
          <button
            className={style.button}
            onClick={() => login(username, password)}
          >
            {language ? "Connexion" : "Нэвтрэх"}
          </button>
          <div>
            <Link to="/signup" style={{ color: "#02b589", fontWeight: "500" }}>
              {language
                ? "Vous n'avez pas de compte ?"
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