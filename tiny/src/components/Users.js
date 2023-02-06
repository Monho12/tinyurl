import { useContext, useEffect } from "react";
import { client } from "../client";
import style from "../style/Urls.module.css";
import { Button } from "react-bootstrap";
import { Allusers } from "./Allusers";
import { StateContext } from "../contexts/StateProvider";

export const Users = () => {
  const {
    language,
    count,
    setCount,
    number,
    setNumber,
    allUsers,
    setAllUsers,
  } = useContext(StateContext);

  useEffect(() => {
    client.get(`/users?skip=${number}`).then((res) => {
      setAllUsers(res.data.result);
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
        {allUsers.length === 0 && (
          <div className={style.notExist}>
            <h1>Уучларай энд таны хайсан юм чинь алга даа</h1>
          </div>
        )}
        {allUsers.map((item, index) => {
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
        <div>{number + 1}</div>
        <Button variant="success" onClick={next}>
          {language ? "次" : "next"}
        </Button>
      </div>
    </div>
  );
};
