import { useContext } from "react";
import logo from "../assets/logo.svg";
import { AuthContext } from "../contexts/AuthProvider";
import style from "../style/Forgot.module.css";

export const ForgotPass = () => {
  const { language } = useContext(AuthContext);
  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <div className={style.section}>
          {/* logoSection */}
          <img src={logo} alt="logo" />
          <div className={style.text}>
            <div>
              {language ? "Récupération de mot de passe" : "Нууц үг сэргээх"}
            </div>

            <div className={style.text1}>
              {language
                ? "Nous enverrons un e-mail de réinitialisation du mot de passe à votre numéro de téléphone."
                : "Бид таны Утасны дугаар руу нууц үг сэргээх хаяг явуулах болно."}
            </div>
          </div>
        </div>
        <div>
          {/* InputSection */}
          <div className={style.inputDiv}>
            <div className={style.text2}>
              {language ? "Numéro de téléphone" : "Утасны дугаар"}
            </div>
            <input
              className={style.input}
              placeholder={language ? "Numéro de téléphone" : "Утасны дугаар"}
              type="text"
            />
          </div>
        </div>

        <div className={style.buttonSection}>
          <button className={style.button}>
            {language ? "Envoyer" : "Илгээх"}
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
