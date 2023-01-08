import style from "../style/Signup.module.css";
import logo from "../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useState } from "react";

export const Signup = () => {
  const { signup } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <div>
          {/* logoSection */}
          <img src={logo} alt="logo" />
          <div className={style.text}>Бүртгүүлэх</div>
        </div>
        <div>
          {/* InputSection */}
          <div className={style.inputDiv}>
            <div className={style.text2}>Цахим хаяг</div>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className={style.input}
              placeholder="enter your name"
              type="text"
            />
          </div>
          <div className={style.inputDiv}>
            <div className={style.text2}>Нууц үг</div>
            <input
              className={style.input}
              placeholder="enter your password"
              type="password"
            />
          </div>
          <div className={style.inputDiv}>
            <div className={style.text2}>Нууц үгээ давтна уу?</div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={style.input}
              placeholder="enter your password again"
              type="password"
            />
          </div>
        </div>
        <div className={style.buttonSection}>
          <button
            className={style.button}
            onClick={() => signup(username, password)}
          >
            Бүртгүүлэх
          </button>
        </div>
        <div className={style.footer}>
          <div>Made with ❤️ by Nest Academy</div>
          <div style={{ color: "grey" }}>©boginoo.io 2023</div>
        </div>
      </div>
    </div>
  );
};
