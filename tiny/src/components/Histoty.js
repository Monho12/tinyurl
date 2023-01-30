import { AuthContext } from "../contexts/AuthProvider";
import { useContext } from "react";
import { client } from "../client";
import { ToastContainer, toast } from "react-toastify";
import style from "../style/Links.module.css";

export const Histoty = ({ index, short, full, _id }) => {
  const { language, setLinks } = useContext(AuthContext);

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

  const notify = () => {
    toast.success("deleted", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const deleteUrl = (_id) => {
    console.log("clicked");
    client.delete(`/${_id}`).then((res) => {
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
