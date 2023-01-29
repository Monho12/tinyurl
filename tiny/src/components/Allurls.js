import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import style from "../style/Links.module.css";

export const Allurls = ({ full, short, index, Creator }) => {
  const { language } = useContext(AuthContext);

  const copy = () => {
    navigator.clipboard
      .writeText("http://localhost:7000/" + short)
      .then(() => {
        alert("successfully copied");
      })
      .catch(() => {
        alert("something went wrong :o");
      });
  };

  return (
    <div className={style.links}>
      <div>
        <div>
          <div className={style.text}>
            {language ? "完全なリンク:" : "Өгөгдсөн холбоос:"}
          </div>
          <div className={style.link}>{full && full}</div>
        </div>

        <div>
          <div className={style.text}>
            {language ? "短いリンク:" : "Богино холбоос:"}
          </div>
          <div className={style.shortSection}>
            <div className={style.link}>
              http://localhost:7000/{short && short}
            </div>
            <div className={style.copy} onClick={() => copy(index)}>
              {language ? "コピー" : "Хуулж авах"}
            </div>
          </div>
        </div>
        <div className={style.text}>
          {language ? "クリエイターID : " : "Creator ID : "}
          <div className={style.link}> {Creator}</div>
        </div>
        <hr />
      </div>
    </div>
  );
};
