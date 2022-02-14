import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const [Values, setValues] = useState({
    name: "",
    password: "",
  });

  let onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        method: "post",
        url: `http://localhost:5000/api/sign-in`,
        data: Values,
      };
      let { data } = await axios(config);
      console.log("datas", data);
      localStorage.setItem("user", JSON.stringify(Values.name));
      if (data.success) {
        localStorage.setItem("isLogin", "true");
        setSuccess(true);
      }
      setTimeout(async () => {
        let response = await axios.get(
          "http://localhost:5000/api/v1/users/refresh-token",
          { withCredentials: true }
        );
        console.log(response);
        console.log(response.data.data.success);
      }, 2000);
    } catch (error) {
      console.log(error.response);
    }
  };

  let redirectHandler = () => {
    if (JSON.parse(localStorage.getItem("isLogin"))) {
      return <Navigate to="/profile" />;
    }
  };
  let showHandler = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className="container">
        {redirectHandler()}
        <div className="form-container">
          <form onSubmit={onSubmitHandler}>
            <h1>Login to Start chat</h1>
            <br />
            <br />
            <input
              type="text"
              onChange={(e) => setValues({ ...Values, name: e.target.value })}
              placeholder="Enter your name"
            />
            <br />
            <br />
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) =>
                setValues({ ...Values, password: e.target.value })
              }
              placeholder="Enter your password"
            />
            {Values.password !== "" && (
              <span onClick={() => showHandler()}>
                {!showPassword ? (
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                  />
                ) : (
                  <img
                    src="https://www.kindpng.com/picc/m/327-3273865_password-eye-icon-png-transparent-png.png"
                    alt=""
                  />
                )}
              </span>
            )}
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
}
