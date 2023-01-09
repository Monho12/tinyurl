import style from "../style/Home.module.css";
import { Histoty, Links } from "../components";
import { useContext } from "react";
import { DataContext } from "../contexts/DataProvider";
import Button from "react-bootstrap/esm/Button";

export const Home = () => {
  const { setSearchInput, full, setValue, toggle, setToggle, urls } =
    useContext(DataContext);

  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <div>
          {/* logoSection */}
          <div className={style.img} />
        </div>
        <div className={style.inputDiv}>
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            ref={full}
            className={style.input}
            placeholder="https://www.web-huudas.mn"
            type="text"
          />
          <button className={style.button} onClick={setValue}>
            Богиносгох
          </button>
        </div>
        <div className={style.history}>
          <Button
            onClick={() => setToggle(!toggle)}
            style={{ backgroundColor: "#02b589", border: "none" }}
          >
            History
          </Button>
          {toggle && (
            <>
              <div className={style.text}>Түүх</div>
              <div className={style.historyContainer}>
                <div className={style.historyLinks}>
                  <Histoty />
                </div>
              </div>
            </>
          )}

          {!toggle &&
            urls.map((item, index) => {
              return <Links {...item} key={index} />;
            })}
        </div>

        <div className={style.footer}>
          <div>Made with ❤️ by Pinecone Academy</div>
          <div style={{ color: "grey" }}>©boginoo.io 2023</div>
        </div>
      </div>
    </div>
  );
};
