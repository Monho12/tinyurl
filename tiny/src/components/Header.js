import style from "../style/Header.module.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { StateContext } from "../contexts/StateProvider";
import { Button, Modal, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";

export const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { language, setLanguage } = useContext(StateContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const HowItWorks = () => {
    toast.info("Өгөгдсөн холбоосыг богино , авсаархан болгодог байгаа шүү.", {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      closeOnClick: true,
      autoClose: 3000,
    });
  };
  const LogOut = () => {
    setShow(false);
    logout();
  };

  return (
    <div className={style.container}>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Та гараx даа нэг л итгэлгүй байгаа юм биш биз?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="light" onClick={handleClose}>
              за тийм дээ
            </Button>
            <Button variant="success" onClick={LogOut}>
              итгэлтэй байнөө
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <div className={style.innerContainer}>
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
