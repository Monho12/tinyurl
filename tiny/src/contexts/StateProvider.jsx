import { createContext, useState } from "react";

export const StateContext = createContext();

export const StateProvider = (props) => {
  const [language, setLanguage] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [number, setNumber] = useState(0);
  const [count, setCount] = useState();
  const [history, setHistory] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [links, setLinks] = useState([]);

  return (
    <StateContext.Provider
      value={{
        language,
        setLanguage,
        toggle,
        setToggle,
        history,
        setHistory,
        number,
        setNumber,
        count,
        setCount,
        allUsers,
        setAllUsers,
        links,
        setLinks,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};
