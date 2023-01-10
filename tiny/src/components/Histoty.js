import { AuthContext } from "../contexts/AuthProvider";
import { useContext, useEffect } from "react";
import style from "../style/Links.module.css";

export const Histoty = ({ index, short, full, creator }) => {
  const { links, user, language } = useContext(AuthContext);

  if (links[index].Creator === user._id) {
    return (
      <div className={style.links}>
        <div>
          <div>
            <div className={style.text}>
              {" "}
              {language ? "URL complète" : "Өгөгдсөн холбоос:"}
            </div>
            <a href={full} target="_blank" className={style.link}>
              {full && full}
            </a>
          </div>

          <div>
            <div className={style.text}>
              {" "}
              {language ? "URL courte" : "Богино холбоос:"}
            </div>
            <div className={style.shortSection}>
              <a
                href={`http://localhost:7000/${short}`}
                target="_blank"
                className={style.link}
              >
                localhost:7000/{short && short}
              </a>
            </div>
          </div>
          <hr />
        </div>
      </div>
    );
  }
};
