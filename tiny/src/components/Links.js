import { useContext } from "react";
import { DataContext } from "../contexts/DataProvider";
import style from "../style/Links.module.css";

export const Links = ({ full, short }) => {
  const { copyText } = useContext(DataContext);

  const copy = () => {
    let text = copyText;
    navigator.clipboard.writeText("http://localhost:7000/" + text);
    alert("Copied to clipboard");
  };

  return (
    <div className={style.links}>
      <div>
        <div className={style.text}>Өгөгдсөн холбоос:</div>
        <a href={full} target="_blank" className={style.link}>
          {full && full}
        </a>
      </div>
      <div></div>

      <div>
        <div className={style.text}>Богино холбоос:</div>
        <div className={style.shortSection}>
          <a
            href={`http://localhost:7000/${short}`}
            target="_blank"
            className={style.link}
          >
            shortly.io/{short && short}
          </a>
          <div className={style.copy} onClick={copy}>
            Хуулж авах
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};
