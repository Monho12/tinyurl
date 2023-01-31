import { useContext } from "react";
import { client } from "../client";
import { ToastContainer, toast } from "react-toastify";
import style from "../style/Links.module.css";
import { DataContext } from "../contexts/DataProvider";
import { AuthContext } from "../contexts/AuthProvider";

export const Allusers = ({ username, roles, _id, index }) => {
  const { language, number, setCount, setAllUsers } = useContext(DataContext);

  const deleteUrl = (_id) => {
    console.log("clicked");
    client.delete(`/user/${_id}`).then((res) => {
      console.log(res);
      notify();
      client.get(`/users?skip=${number}`).then((res) => {
        setAllUsers(res.data.result);
        setCount(res.data.count - 1);
      });
    });
  };

  const notify = () => {
    toast.error("deleted", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className={style.links}>
      <ToastContainer />
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
          {roles[index] !== "admin" && (
            <div
              className={style.copy}
              style={{ color: "red" }}
              onClick={() => deleteUrl(_id)}
            >
              {language ? "消去" : "Устгах"}
            </div>
          )}
        </div>
        <hr />
      </div>
    </div>
  );
};
