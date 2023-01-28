import { useEffect, useState } from "react";
import { client } from "../client";
import { Links } from "./Links";
import style from "../style/Urls.module.css";
import { Button } from "react-bootstrap";
import { Allurls } from "./Allurls";

export const Urls = () => {
  const [admin, setAdmin] = useState([]);
  const [number, setNumber] = useState(0);
  const [count, setCount] = useState();

  useEffect(() => {
    client.get(`/links?skip=${number}`).then((res) => {
      setAdmin(res.data.result);
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
      <div className={style.history}>
        {admin.map((item, index) => {
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
        <div>Page {number + 1}</div>
        <Button variant="success" onClick={next}>
          next
        </Button>
      </div>
    </div>
  );
};
