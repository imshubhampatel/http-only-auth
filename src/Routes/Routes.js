import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import Login from "../Components/Login";
import Profile from "../Components/Profile";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

export default function Routes() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute Navigate={Navigate}>
                <Profile auth="true" />
              </PrivateRoute>
            }
          />
        </Switch>
      </BrowserRouter>
    </>
  );
}
