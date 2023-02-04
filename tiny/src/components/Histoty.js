import { useContext, useState } from "react";
import { client } from "../client";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import { StateContext } from "../contexts/StateProvider";
import style from "../style/Links.module.css";

export const Histoty = ({ index, short, full, _id }) => {
  const { language, setLinks } = useContext(StateContext);
  const [show, setShow] = useState(false);

  const copyNotify = () => {
    toast.success("Copied!", {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      closeOnClick: true,
      autoClose: 3000,
    });
  };

  const copy = () => {
    navigator.clipboard
      .writeText("https://boginooapi.onrender.com/" + short)
      .then(() => {
        copyNotify();
      })
      .catch(() => {
        alert("something went wrong :o");
      });
  };

  const notify = () => {
    toast.error("Устагчлаашд!", {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      closeOnClick: true,
      autoClose: 3000,
    });
  };

  const deleteUrl = (_id) => {
    client.delete(`/url/${_id}`).then((res) => {
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
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h5>
                Өөртөө итгэлтэй та энэ холбоосыг устгахдаа итгэлтэй байна уу?
              </h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="light" onClick={handleClose}>
              Болих
            </Button>
            <Button variant="danger" onClick={remove}>
              Анхаан
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
              https://boginooapi.onrender.com/{short && short}
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
        <hr />
      </div>
    </div>
  );
};
