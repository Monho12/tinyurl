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
            {language ? "ユーザー名 : " : "Хэрэглэгчийн нэр : "}
            {username}
          </div>

          <div className={style.link}>
            {language ? "役割 : " : "Roles : "}
            {roles[0]}
          </div>

          <div className={style.link}>
            {language ? "ID : " : "ID : "}
            {_id}
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};
