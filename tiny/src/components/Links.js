import { useContext } from "react";
import { StateContext } from "../contexts/StateProvider";
import { toast } from "react-toastify";
import style from "../style/Links.module.css";

export const Links = ({ full, short, index }) => {
  const { language } = useContext(StateContext);

  const monho = () => {
    toast.info("Copied!", {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      closeOnClick: true,
      autoClose: 3000,
    });
  };

  const copy = () => {
    navigator.clipboard
      .writeText("http://localhost:7000/" + short)
      .then(() => {
        monho();
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
        <hr />
      </div>
    </div>
  );
};
