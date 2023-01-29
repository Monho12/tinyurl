import { useContext, useEffect, useState } from "react";
import { client } from "../client";
import style from "../style/Urls.module.css";
import { Button } from "react-bootstrap";
import { Allusers } from "./Allusers";
import { AuthContext } from "../contexts/AuthProvider";

export const Users = () => {
  const { language } = useContext(AuthContext);
  const [number, setNumber] = useState(0);
  const [count, setCount] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    client.get(`/users?skip=${number}`).then((res) => {
      setUsers(res.data.result);
      setCount(res.data.count - 1);
    });
  }, [number]);

  const previous = () => {
    if (number > 0) return setNumber(number - 1);
  };

  const next = () => {
    if (number < count) return setNumber(number + 1);
  };

  return (
    <div className={style.container}>
      <h1> {language ? "ユーザー" : "Хэрэглэгчид"} </h1>
      <div className={style.history}>
        {users &&
          users.map((item, index) => {
            return (
              <div key={index}>
                <div style={{ display: "flex", gap: "15px" }}>
                  {index + 1}. <Allusers {...item} index={index} />
                </div>
              </div>
            );
          })}
      </div>

      <div className={style.footer}>
        <Button variant="success" onClick={previous}>
          {language ? "前" : "previous"}
        </Button>
        <div>
          {language ? "ページ" : "Page"} {number + 1}
        </div>
        <Button variant="success" onClick={next}>
          {language ? "次" : "next"}
        </Button>
      </div>
    </div>
  );
};
