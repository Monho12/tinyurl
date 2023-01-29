import { useContext } from "react";
import logo from "../assets/logo.svg";
import { AuthContext } from "../contexts/AuthProvider";
import style from "../style/Forgot.module.css";
import { Footer } from "./Footer";

export const ForgotPass = () => {
  const { language } = useContext(AuthContext);

  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <div className={style.section}>
          <img src={logo} alt="logo" />
          <div className={style.text}>
            <div>{language ? "パスワードの復元" : "Нууц үг сэргээх"}</div>

            <div className={style.text1}>
              {language
                ? "お客様の電話番号にパスワード再設定メールをお送りします。"
                : "Бид таны Утасны дугаар руу нууц үг сэргээх хаяг явуулах болно."}
            </div>
          </div>
        </div>
        <div>
          <div className={style.inputDiv}>
            <div className={style.text2}>
              {language ? "電話番号" : "Утасны дугаар"}
            </div>
            <input
              className={style.input}
              placeholder={language ? "電話番号" : "Утасны дугаар"}
              type="text"
            />
          </div>
        </div>

        <div className={style.buttonSection}>
          <button className={style.button}>
            {language ? "送信" : "Илгээх"}
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
};
