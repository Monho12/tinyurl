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
            <a href={full} target="_blank" className={style.link}>
              {full && full}
            </a>
          </div>

          <div>
            <div className={style.text}>
              {language ? "短いリンク:" : "Богино холбоос:"}
            </div>
            <div className={style.shortSection}>
              <a
                href={`http://localhost:7000/${short}`}
                target="_blank"
                className={style.link}
              >
                localhost:7000/{short && short}
              </a>
              <div className={style.copy} onClick={copy}>
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
