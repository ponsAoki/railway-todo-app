import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import url from "../const";
import "./editList.scss";

function EditList() {
  const navigate = useNavigate();
  const { listId } = useParams();
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies();
  const handleTitleChange = (e) => setTitle(e.target.value);
  const onUpdateList = () => {
    const data = {
      title,
    };

    axios
      .put(`${url}/lists/${listId}`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`更新に失敗しました。 ${err}`);
      });
  };

  const onDeleteList = () => {
    axios
      .delete(`${url}/lists/${listId}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`削除に失敗しました。${err}`);
      });
  };

  useEffect(() => {
    axios
      .get(`${url}/lists/${listId}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        const list = res.data;
        setTitle(list.title);
      })
      .catch((err) => {
        setErrorMessage(`リスト情報の取得に失敗しました。${err}`);
      });
  }, []);

  return (
    <div>
      <Header />
      <main className="edit-main">
        <h2>リスト編集</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="edit-form">
          <label htmlFor="titleInput">
            タイトル
            <br />
            <input
              id="titleInput"
              type="text"
              className="edit-list-title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          <br />
          <button
            type="button"
            className="delete-button"
            onClick={onDeleteList}
          >
            削除
          </button>
          <button type="button" className="edit-button" onClick={onUpdateList}>
            更新
          </button>
        </form>
      </main>
    </div>
  );
}

export default EditList;
