import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EditList from "../pages/EditList";
import EditTask from "../pages/EditTask";
import Home from "../pages/Home";
import NewList from "../pages/NewList";
import NewTask from "../pages/NewTask";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

function Router() {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* {auth ? ( */}
        <>
          <Route
            path="/"
            element={auth ? <Home /> : <Navigate replace to="/signin" />}
          />
          <Route
            path="/task/new"
            element={auth ? <NewTask /> : <Navigate replace to="/signin" />}
          />
          <Route
            path="/list/new"
            element={auth ? <NewList /> : <Navigate replace to="/signin" />}
          />
          <Route
            exact
            path="/lists/:listId/tasks/:taskId"
            element={auth ? <EditTask /> : <Navigate replace to="/signin" />}
          />
          <Route
            path="/lists/:listId/edit"
            element={auth ? <EditList /> : <Navigate replace to="/signin" />}
          />
        </>
        {/* ) : (
          <Route>
            <Navigate replace to="/signin" />
          </Route>
        )} */}
        <Route element={NotFound} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
