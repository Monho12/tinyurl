import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import style from "../style/Links.module.css";

export const Allusers = ({ username, roles, _id }) => {
  const { language } = useContext(AuthContext);

  return (
    <div className={style.links}>
      <div>
        <div>
          <div className={style.link}>
            {language ? "完全なリンク:" : "Username: "}
            {username}
          </div>
          <div className={style.link}></div>

          <div className={style.link}>
            {language ? "" : "Roles: "}
            {roles[0]}
          </div>

          <div className={style.link}>
            {language ? "完全なリンク:" : "ID : "}
            {_id}
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};
