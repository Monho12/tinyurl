import axios from "axios";
import { useEffect, useState } from "react";
import { Links } from "./Links";

export const Histoty = () => {
  const [histoty, setHistory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7000/urls").then((res) => {
      console.log(res.data);
      setHistory(res.data);
    });
  }, []);

  return (
    <div>
      {histoty.map((item, index) => {
        return <Links {...item} key={index} />;
      })}
    </div>
  );
};
