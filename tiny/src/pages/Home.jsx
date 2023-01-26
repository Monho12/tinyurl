import style from "../style/Home.module.css";
import { Histoty, Links } from "../components";
import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthProvider";

export const Home = () => {


  const {
    setSearchInput,
    full,
    urls,
    setValue,
    toggle,
    setToggle,
    links,
    user,
    language,
  } = useContext(AuthContext);

  return (
    <div className={style.container}>
    
      <div className={style.innerContainer}>
        <div>
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
            {language ? "短くする" : "Богиносгох"}
          </button>
        </div>
        <div className={style.history}>
          <Button
            onClick={() => setToggle(!toggle)}
            style={{
              backgroundColor: "#02b589",
              border: "none",
              fontWeight: "600",
            }}
          >
            {language
              ? toggle
                ? "戻る"
                : "歴史を見る"
              : toggle
              ? "Буцах"
              : "Түүх харах"}
          </Button>
          {toggle && (
            <>
              <div className={style.text}>{language ? "歴史" : "Түүх"}</div>

              <div className={style.historyContainer}>
                <div className={style.historyLinks}>
                  {links.map((item, index) => {
                    return (
                      <div key={index}>
                        {user && (
                          <Histoty {...item} key={index} index={index} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
          {!toggle &&
            urls.map((item, index) => {
              return <Links {...item} key={index} index={index} />;
            })}
        </div>

        <div className={style.footer}>
          <div>
            {language
              ? "松ぼっくりアカデミーによる ❤️ で作られました"
              : "Made with ❤️ by Pinecone  Academy"}
          </div>
          <div style={{ color: "grey" }}>©boginoo.io 2023</div>
        </div>
      </div>
    </div>
  );
};
