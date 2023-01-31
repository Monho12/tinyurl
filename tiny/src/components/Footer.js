import { useContext } from "react";
import { DataContext } from "../contexts/DataProvider";
import style from "../style/Footer.module.css";

export const Footer = () => {
  const { language } = useContext(DataContext);

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
