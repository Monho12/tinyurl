import { AuthContext } from "../contexts/AuthProvider";
import { useContext } from "react";
import { client } from "../client";
import { ToastContainer, toast } from "react-toastify";
import style from "../style/Links.module.css";
import { DataContext } from "../contexts/DataProvider";

export const Histoty = ({ index, short, full, _id }) => {
  const { setLinks } = useContext(AuthContext);
  const { language } = useContext(DataContext);

  const copy = () => {
    navigator.clipboard
      .writeText("http://localhost:7000/" + short)
      .then(() => {
        copyNotify();
      })
      .catch(() => {
        alert("something went wrong :o");
      });
  };

  const notify = () => {
    toast.error("Deleted!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const copyNotify = () => {
    toast.success("Copied!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const deleteUrl = (_id) => {
    console.log("clicked");
    client.delete(`/url/${_id}`).then((res) => {
      console.log(res.data);
      notify();
      client.get("/urls").then((res) => {
        setLinks(res.data);
      });
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
            <div className={style.link}>localhost:7000/{short && short}</div>
            <div className={style.copy} onClick={() => copy(index)}>
              {language ? "コピー" : "Хуулж авах"}
            </div>

            <div
              className={style.copy}
              style={{ color: "red" }}
              onClick={() => deleteUrl(_id)}
            >
              {language ? "消去" : "Устгах"}
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};
