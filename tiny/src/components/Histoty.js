import { AuthContext } from "../contexts/AuthProvider";
import { useContext } from "react";
import style from "../style/Links.module.css";

export const Histoty = ({ index, short, full }) => {
  const { links, user, language } = useContext(AuthContext);

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

  if (links[index].Creator === user._id) {
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
              <div className={style.link}>localhost:7000/{short && short}</div>
              <div className={style.copy} onClick={() => copy(index)}>
                {language ? "コピー" : "Хуулж авах"}
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    );
  }
};
