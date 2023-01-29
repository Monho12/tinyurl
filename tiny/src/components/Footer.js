import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import style from "../style/Footer.module.css";

export const Footer = () => {
  const { language } = useContext(AuthContext);

  return (
    <div className={style.footer}>
      <div>
        {language
          ? "松ぼっくりアカデミーによる ❤️ で作られました"
          : "Made with ❤️ by Pinecone  Academy"}
      </div>
      <div style={{ color: "grey" }}>©boginoo.io 2023</div>
    </div>
  );
};
