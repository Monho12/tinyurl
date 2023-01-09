import { createContext, useState, useRef } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [copyText, setCopyText] = useState("");
  const [toggle, setToggle] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [urls, setUrls] = useState([]);

  let full = useRef();
  const setValue = () => {
    if (searchInput.includes("https://")) {
      const fullUrl = full.current.value;
      axios
        .post("http://localhost:7000/urls", { full: fullUrl })
        .then((res) => {
          setUrls([res.data]);
          setCopyText(res.data.short);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please enter a valid URL");
    }
  };

  return (
    <DataContext.Provider
      value={{
        copyText,
        setCopyText,
        toggle,
        setToggle,
        setValue,
        setSearchInput,
        urls,
        full,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
