import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [language, setLanguage] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [number, setNumber] = useState(0);
  const [count, setCount] = useState();
  const [history, setHistory] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  return (
    <DataContext.Provider
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
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
