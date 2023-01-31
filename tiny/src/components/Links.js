import { useContext } from "react";
import { DataContext } from "../contexts/DataProvider";
import { ToastContainer, toast } from "react-toastify";
import style from "../style/Links.module.css";

export const Links = ({ full, short, index }) => {
  const { language } = useContext(DataContext);

  const copy = () => {
    navigator.clipboard
      .writeText("http://localhost:7000/" + short)
      .then(() => {
        notify();
      })
      .catch(() => {
        alert("something went wrong :o");
      });
  };

  const notify = () => {
    toast.success("Copied!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className={style.links}>
      <ToastContainer />
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
