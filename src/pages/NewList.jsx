import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import url from "../const";
import "./newList.scss";

function NewList() {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleTitleChange = (e) => setTitle(e.target.value);
  const onCreateList = () => {
    const data = {
      title,
    };

    axios
      .post(`${url}/lists`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`リストの作成に失敗しました。${err}`);
      });
  };

  return (
    <div>
      <Header />
      <main id="main" className="new-list">
        <h2>リスト新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form id="form" className="new-list-form">
          <label htmlFor="newListInput">
            タイトル
            <br />
            <input
              id="newListInput"
              type="text"
              onChange={handleTitleChange}
              className="new-list-title"
            />
          </label>
          <br />
          <button
            id="button"
            type="button"
            onClick={onCreateList}
            className="new-list-button"
          >
            作成
          </button>
        </form>
      </main>
    </div>
  );
}

export default NewList;
