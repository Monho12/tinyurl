import { useContext, useEffect } from "react";
import { client } from "../client";
import { Button, Spinner } from "react-bootstrap";
import { Allurls } from "./Allurls";
import style from "../style/Urls.module.css";
import { DataContext } from "../contexts/DataProvider";

export const Urls = () => {
  const { language, number, setNumber, count, setCount, setHistory, history } =
    useContext(DataContext);

  useEffect(() => {
    client.get(`/links?skip=${number}`).then((res) => {
      setHistory(res.data.result);
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
      <h1> {language ? "リンク" : "Холбоосууд"} </h1>
      <div className={style.history}>
        {console.log(history)}
        {history.length === 0 && (
          <div className={style.notExist}>
            <h1>Sorry bro , i cant find urls</h1>
          </div>
        )}
        {history.map((item, index) => {
          return (
            <div key={index}>
              <div style={{ display: "flex", gap: "15px" }}>
                {index + 1}. <Allurls {...item} index={index} />
              </div>
            </div>
          );
        })}
      </div>

      <div className={style.footer}>
        <Button variant="success" onClick={previous}>
          previous
        </Button>
        <div>{number + 1}</div>
        <Button variant="success" onClick={next}>
          next
        </Button>
      </div>
    </div>
  );
};
