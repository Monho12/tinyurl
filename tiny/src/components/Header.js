import style from "../style/Header.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

export const Header = () => {
  const { user, logout, setLanguage, language } = useContext(AuthContext);

  console.log(user);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const LogOut = () => {
    setShow(false);
    logout();
  };

  return (
    <div className={style.container}>
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
        <div>
          <Link to="/howto" style={{ textDecoration: "none" }}>
            <div className={style.text}>
              {language
                ? "それはどのように機能しますか？"
                : "Хэрхэн ажилладаг вэ?"}
            </div>
          </Link>
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
              {user.username && user.username}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleShow}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  );
};
