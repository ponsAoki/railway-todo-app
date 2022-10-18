import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signIn } from "../authSlice";
import Header from "../components/Header";
import url from "../const";
import "./signin.scss";

function SignIn() {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const onSignIn = () => {
    axios
      .post(`${url}/signin`, { email, password })
      .then((res) => {
        setCookie("token", res.data.token);
        dispatch(signIn());
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err}`);
      });
  };

  if (auth) return <Navigate to="/" />;

  return (
    <div>
      <Header />
      <main className="sign-main">
        <h2>サインイン</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signin-form">
          <label className="email-label" htmlFor="emailInput">
            メールアドレス
            <br />
            <input
              id="emailInput"
              type="email"
              className="email-input"
              onChange={handleEmailChange}
            />
          </label>
          <br />
          <label className="password-label" htmlFor="passwordInput">
            パスワード
            <br />
            <input
              id="passwordInput"
              type="password"
              className="password-input"
              onChange={handlePasswordChange}
            />
          </label>
          <br />
          <button type="button" className="sign-button" onClick={onSignIn}>
            サインイン
          </button>
        </form>
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  );
}

export default SignIn;
