import style from "../style/Header.module.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { StateContext } from "../contexts/StateProvider";
import { Button, Modal, Dropdown } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

export const Header = () => {
  const { user, logout, expire } = useContext(AuthContext);
  const { language, setLanguage } = useContext(StateContext);

  const [show, setShow] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(30);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const notify = () => {
    toast.warning("Your session time expires in 1 minute", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const lastNotify = () => {
    toast.warning("Your session time has expired", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const HowItWorks = () => {
    toast.info("Би ч бас мэдэхгүй байнөөө", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const LogOut = () => {
    setShow(false);
    logout();
  };

  useEffect(() => {
    if (minutes === 0 && seconds === 59) {
      notify();
    }
    if (minutes == 0 && seconds == 6) {
      lastNotify();
    }
  }, [seconds]);

  useEffect(() => {
    if (user) {
      if (expire * 1000 < Date.now()) return logout();
      const interval = setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds, user]);

  return (
    <div className={style.container}>
      <ToastContainer />
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to log out?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="light" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={LogOut}>
              Log Out
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <div className={style.innerContainer}>
        <div></div>
        <div>
          <div
            onClick={HowItWorks}
            to="/howto"
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <div className={style.text}>
              {language
                ? "それはどのように機能しますか？"
                : "Хэрхэн ажилладаг вэ?"}
            </div>
          </div>
        </div>

        <button
          onClick={() => setLanguage(!language)}
          style={{ border: "none", backgroundColor: "transparent" }}
        >
          {language ? "MN" : "JP"}
        </button>
        {user && (
          <div className={style.timer}>
            {minutes < 10 ? "0" : ""}
            {minutes} : {seconds < 10 ? "0" : ""}
            {seconds}
          </div>
        )}
        {user?.username && (
          <Dropdown>
            <Dropdown.Toggle
              style={{
                backgroundColor: "transparent",
                color: "black",
                fontSize: "23px",
                fontWeight: "650",
                border: "none",
              }}
              id="dropdown-basic"
            >
              {user && user.username}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div className={style.dropdown}>
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  Home
                </Link>

                {user.roles[0] === "admin" && (
                  <div className={style.dropdown2}>
                    <Link
                      to="/urls"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Urls
                    </Link>

                    <Link
                      to="/users"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Users
                    </Link>
                  </div>
                )}

                <Link
                  onClick={handleShow}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Logout
                </Link>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  );
};
