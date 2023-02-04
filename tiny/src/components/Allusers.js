import { useContext, useState } from "react";
import { client } from "../client";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import { StateContext } from "../contexts/StateProvider";
import style from "../style/Links.module.css";

export const Allusers = ({ username, roles, _id, index }) => {
  const { language, number, setCount, setAllUsers } = useContext(StateContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const remove = () => {
    setShow(false);
    deleteUser(_id);
  };

  const deleteUser = (_id) => {
    client.delete(`/user/${_id}`).then((res) => {
      console.log(res);
      notify();
      client.get(`/users?skip=${number}`).then((res) => {
        setAllUsers(res.data.result);
        setCount(res.data.count - 1);
      });
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

  return (
    <div className={style.links}>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h5>
                Өөртөө итгэлтэй та энэ хэрэглэгчийг устгахдаа итгэлтэй байна уу?
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
          <div className={style.link}>
            {language ? "ユーザー名 : " : "Хэрэглэгчийн нэр : "}
            {username}
          </div>

          <div className={style.link}>
            {language ? "役割 : " : "Roles : "}
            {roles[0]}
          </div>

          <div className={style.link}>
            {language ? "ID : " : "ID : "}
            {_id}
          </div>
          {roles[index] !== "admin" && (
            <div
              className={style.copy}
              style={{ color: "red" }}
              onClick={handleShow}
            >
              {language ? "消去" : "Устгах"}
            </div>
          )}
        </div>
        <hr />
      </div>
    </div>
  );
};
