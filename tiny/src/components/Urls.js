import { useContext, useEffect } from "react";
import { client } from "../client";
import { Button } from "react-bootstrap";
import { Allurls } from "./Allurls";
import { StateContext } from "../contexts/StateProvider";
import style from "../style/Urls.module.css";

export const Urls = () => {
  const {
    language,
    count,
    setCount,
    setHistory,
    history,
    number2,
    setNumber2,
  } = useContext(StateContext);

  useEffect(() => {
    client.get(`/links?skip=${number2}`).then((res) => {
      setHistory(res.data.result);
      setCount(res.data.count - 1);
    });
  }, [number2]);

  const previous = () => {
    if (number2 > 0) return setNumber2(number2 - 1);
  };

  const next = () => {
    if (number2 < count) return setNumber2(number2 + 1);
  };

  return (
    <div className={style.container}>
      <h1> {language ? "リンク" : "Холбоосууд"} </h1>
      <div className={style.history}>
        {history.length === 0 && (
          <div className={style.notExist}>
            <h1>Уучларай энд таны хайсан юм чинь алга даа</h1>
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
        <div>{number2 + 1}</div>
        <Button variant="success" onClick={next}>
          next
        </Button>
      </div>
    </div>
  );
};
