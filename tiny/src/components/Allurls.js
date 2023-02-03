import { useContext, useState } from "react";
import { client } from "../client";
import { ToastContainer, toast } from "react-toastify";
import { StateContext } from "../contexts/StateProvider";
import { Button, Modal } from "react-bootstrap";
import style from "../style/Links.module.css";

export const Allurls = ({ full, short, index, Creator, _id }) => {
  const { language, setHistory, number2, setCount } = useContext(StateContext);
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      console.log(res);
      notify();
      client.get(`/links?skip=${number2}`).then((res) => {
        setHistory(res.data.result);
        setCount(res.data.count - 1);
      });
    });
  };

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
            <div className={style.link}>
              http://localhost:7000/{short && short}
            </div>
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
        <div className={style.text}>
          {language ? "クリエイターID : " : "Creator ID : "}
          <div className={style.link}> {Creator}</div>
        </div>
        <hr />
      </div>
    </div>
  );
};
