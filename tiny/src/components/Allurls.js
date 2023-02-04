import { useContext, useState } from "react";
import { client } from "../client";
import { toast } from "react-toastify";
import { StateContext } from "../contexts/StateProvider";
import { Button, Modal } from "react-bootstrap";
import style from "../style/Links.module.css";

export const Allurls = ({ full, short, index, Creator, _id }) => {
  const { language, setHistory, number2, setCount } = useContext(StateContext);
  const [show, setShow] = useState(false);

  const copy = () => {
    navigator.clipboard
      .writeText("https://api-boginoo.onrender.com/" + short)
      .then(() => {
        copyNot();
      })
      .catch(() => {
        alert("something went wrong :o");
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleted = () => {
    toast.error("Устагчлаашд!", {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      closeOnClick: true,
      autoClose: 3000,
    });
  };
  const copyNot = () => {
    toast.success("Хуулаад авчлаашд!", {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      closeOnClick: true,
      autoClose: 3000,
    });
  };

  const deleteUrl = (_id) => {
    client.delete(`/url/${_id}`).then((res) => {
      console.log(res);
      deleted();
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
              https://api-boginoo.onrender.com/{short && short}
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
