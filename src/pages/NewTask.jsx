import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import url from "../const";
import "./newTask.scss";

function NewTask() {
  const [selectListId, setSelectListId] = useState();
  const [lists, setLists] = useState(["今日", "明日", "今週中"]);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleSelectList = (id) => setSelectListId(id);
  const onCreateTask = () => {
    const data = {
      title,
      detail,
      done: false,
    };

    axios
      .post(`${url}/lists/${selectListId}/tasks`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`タスクの作成に失敗しました。${err}`);
      });
  };

  useEffect(() => {
    axios
      .get(`${url}/lists`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setLists(res.data);
        console.log(res.data);
        setSelectListId(res.data[0]?.id);
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
      });
  }, []);

  return (
    <div>
      <Header />
      <main id="main" className="new-task">
        <h2>タスク新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form id="form" className="new-task-form">
          <label htmlFor="listSelect">
            リスト
            <br />
            <select
              id="listSelect"
              onChange={(e) => handleSelectList(e.target.value)}
              className="new-task-select-list"
            >
              {lists.map((list, key) => (
                <option key={key} className="list-item" value={list.id}>
                  {list.title}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label htmlFor="titleInput">
            タイトル
            <br />
            <input
              type="text"
              onChange={handleTitleChange}
              className="new-task-title"
            />
          </label>
          <br />
          <label htmlFor="detailText">
            詳細
            <br />
            <textarea
              id="detailText"
              type="text"
              onChange={handleDetailChange}
              className="new-task-detail"
            />
          </label>
          <br />
          <button
            id="button"
            type="button"
            className="new-task-button"
            onClick={onCreateTask}
          >
            作成
          </button>
        </form>
      </main>
    </div>
  );
}

export default NewTask;
