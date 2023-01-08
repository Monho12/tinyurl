import style from "../style/Login.module.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";

export const Login = () => {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <div>
          {/* logoSection */}
          <img src={logo} alt="logo" />
          <div className={style.text}>Нэвтрэх</div>
        </div>
        <div>
          {/* InputSection */}
          <div className={style.inputDiv}>
            <div className={style.text2}>Цахим хаяг</div>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className={style.input}
              placeholder="name@mail.domain"
              type="text"
            />
          </div>
          <div className={style.inputDiv}>
            <div className={style.text2}>Нууц үг</div>
            <input
              className={style.input}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              type="password"
            />
          </div>
        </div>
        <div className={style.secondInput}>
          <div className={style.checkbox}>
            <input type="checkbox" style={{ width: "18px", height: "18px" }} />
            Намайг сана
          </div>
          <div>
            <Link to="/forgotpass" style={{ color: "black" }}>
              Нууц үгээ мартсан
            </Link>
          </div>
        </div>
        <div className={style.buttonSection}>
          <button
            className={style.button}
            onClick={() => login(username, password)}
          >
            Нэвтрэх
          </button>
          <div>
            <Link
              to="/signup"
              style={{ color: "black", color: "#02b589", fontWeight: "500" }}
            >
              Шинэ хэрэглэгч бол энд дарна уу?
            </Link>
          </div>
        </div>
        <div className={style.footer}>
          <div>Made with ❤️ by Nest Academy</div>
          <div style={{ color: "grey" }}>©boginoo.io 2023</div>
        </div>
      </div>
    </div>
  );
};
