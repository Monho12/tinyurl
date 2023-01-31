import { AuthContext } from "../contexts/AuthProvider";
import { useContext, useState } from "react";
import { client } from "../client";
import { ToastContainer, toast } from "react-toastify";
import style from "../style/Links.module.css";
import { Button, Modal } from "react-bootstrap";
import { DataContext } from "../contexts/DataProvider";

export const Histoty = ({ index, short, full, _id }) => {
  const { setLinks } = useContext(AuthContext);
  const { language } = useContext(DataContext);
  const [show, setShow] = useState(false);

  const copy = () => {
    navigator.clipboard
      .writeText("http://localhost:7000/" + short)
      .then(() => {
        copyNotify();
      })
      .catch(() => {
        alert("something went wrong :o");
      });
  };

  const notify = () => {
    toast.error("Deleted!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const copyNotify = () => {
    toast.success("Copied!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const deleteUrl = (_id) => {
    console.log("clicked");
    client.delete(`/url/${_id}`).then((res) => {
      console.log(res.data);
      notify();
      client.get("/urls").then((res) => {
        setLinks(res.data);
      });
    });
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const remove = () => {
    setShow(false);
    deleteUrl(_id);
  };

  return (
    <div className={style.links}>
      <ToastContainer />
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h5>Are you sure you want to delete this url?</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="light" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={remove}>
              No cap bro
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <div>
        <div>
          <div className={style.text}>
            {language ? "完全なリンク:" : "Өгөгдсөн холбоос:"}
          </div>
          <div className={style.link}>{full && full}</div>
        </div>

        <div>
          <div className={style.text}>
            {language ? "短いリンク:" : "Богино холбоос:"}
          </div>
          <div className={style.shortSection}>
            <div className={style.link}>localhost:7000/{short && short}</div>
            <div className={style.copy} onClick={() => copy(index)}>
              {language ? "コピー" : "Хуулж авах"}
            </div>

            <div
              className={style.copy}
              style={{ color: "red" }}
              onClick={handleShow}
            >
              {language ? "消去" : "Устгах"}
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};
