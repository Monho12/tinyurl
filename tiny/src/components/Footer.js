import { useContext } from "react";
import { StateContext } from "../contexts/StateProvider";
import style from "../style/Footer.module.css";

export const Footer = () => {
  const { language } = useContext(StateContext);

  return (
    <div className={style.footer}>
      <div>
        {language
          ? "松ぼっくりアカデミーによる ❤️ で作られました"
          : "Made with ❤️ by MnholovesU"}
      </div>
      <div style={{ color: "grey" }}>©boginoo.io 2023</div>
    </div>
  );
};
