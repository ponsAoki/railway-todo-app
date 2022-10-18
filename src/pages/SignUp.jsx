import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { signIn } from "../authSlice";
import Header from "../components/Header";
import url from "../const";
import "./signUp.scss";

function SignUp() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessge] = useState();
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const onSignUp = () => {
    const data = {
      email,
      name,
      password,
    };

    axios
      .post(`${url}/users`, data)
      .then((res) => {
        const { token } = res.data;
        dispatch(signIn());
        setCookie("token", token);
        navigate("/");
      })
      .catch((err) => {
        setErrorMessge(`サインアップに失敗しました。 ${err}`);
      });

    if (auth) return <Navigate to="/" />;
    return null;
  };
  return (
    <div>
      <Header />
      <main className="sign-main">
        <h2>新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signup-form">
          <label htmlFor="emailInput">
            メールアドレス
            <br />
            <input
              id="emailInput"
              type="email"
              onChange={handleEmailChange}
              className="email-input"
            />
          </label>
          <br />
          <label htmlFor="nameInput">
            ユーザ名
            <br />
            <input
              id="nameInput"
              type="text"
              onChange={handleNameChange}
              className="name-input"
            />
          </label>
          <br />
          <label htmlFor="passwrdInput">
            パスワード
            <br />
            <input
              id="passwrdInput"
              type="password"
              onChange={handlePasswordChange}
              className="password-input"
            />
          </label>
          <br />
          <button type="button" onClick={onSignUp} className="sign-button">
            作成
          </button>
        </form>
      </main>
    </div>
  );
}

export default SignUp;
