import style from "../style/Home.module.css";
import { Footer, Histoty, Links } from "../components";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { StateContext } from "../contexts/StateProvider";
import { useEffect, useState, useRef } from "react";
import { client, getAuthorizationHeader } from "../client";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

export const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const { language, toggle, setToggle, links, setLinks } =
    useContext(StateContext);

  const [searchInput, setSearchInput] = useState("");
  const [urls, setUrls] = useState([]);

  let full = useRef();

  useEffect(() => {
    setUrls([]);
  }, [user]);

  useEffect(() => {
    client
      .get("/urls", {
        headers: {
          authorization: getAuthorizationHeader(),
        },
      })
      .then((res) => {
        setLinks(res.data);
      })
      .catch((err) => {
        logout();
      });
  }, []);

  const notify = () => {
    toast.error("Холбоос шүү хүүхдээ ангилаар одоо link юм даа", {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      autoClose: 3000,
      closeOnClick: true,
    });
  };

  const isValidUrl = (urlString) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

  const setValue = () => {
    if (isValidUrl(searchInput)) {
      const fullUrl = full.current.value;
      client
        .post("/urls", {
          full: fullUrl,
          Creator: user._id,
        })
        .then((res) => {
          console.log(res.data);
          setUrls([res.data]);
          setLinks([...links, res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      notify();
    }
  };

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
                  {links &&
                    links.map((item, index) => {
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
            urls &&
            urls.map((item, index) => {
              return <Links {...item} key={index} index={index} />;
            })}
        </div>

        <div className={style.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
};
