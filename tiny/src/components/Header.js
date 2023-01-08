import style from "../style/Header.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { RiArrowDownSLine } from "react-icons/ri";

export const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <div>
          <Link to="/howto" style={{ textDecoration: "none" }}>
            <div className={style.text}>Хэрхэн ажилладаг вэ?</div>
          </Link>
        </div>
        {user && (
          <div>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <div
                style={{ color: "black", fontSize: "23px", fontWeight: "700" }}
              >
                {user && user.username}
                <RiArrowDownSLine style={{ color: "#02b589" }} />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
