import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import style from "../style/Forgot.module.css";

export const ForgotPass = () => {
  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <div className={style.section}>
          {/* logoSection */}
          <img src={logo} alt="logo" />
          <div className={style.text}>
            <div>Нууц үг сэргээх</div>
            <div className={style.text1}>
              Бид таны цахим хаяг руу нууц үг сэргээх хаяг явуулах болно.
            </div>
          </div>
        </div>
        <div>
          {/* InputSection */}
          <div className={style.inputDiv}>
            <div className={style.text2}>Цахим хаяг</div>
            <input
              className={style.input}
              placeholder="name@mail.domain"
              type="text"
            />
          </div>
        </div>

        <div className={style.buttonSection}>
          <button className={style.button}>Илгээх</button>
        </div>
        <div className={style.footer}>
          <div>Made with ❤️ by Nest Academy</div>
          <div style={{ color: "grey" }}>©boginoo.io 2023</div>
        </div>
      </div>
    </div>
  );
};
