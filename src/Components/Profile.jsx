import React, { useState, useEffect } from "react";
import io from "socket.io-client";

export default function Profile() {
  let user = JSON.parse(localStorage.getItem("user"));
  let socket = io.connect("http://localhost:8000");

  socket.on("connect", function () {
    console.log("connection established", socket.id);
  });

  const [message, setMessage] = useState("");

  socket.on("chat", (message) => {
    console.log(message);
  });

  const submitHandler = (e) => {
    console.log("submitted", message);
    e.preventDefault();
    socket.emit("chat", message);
    setMessage("");
  };

  return (
    <>
      <div id="container">
        <h1>Nodejs + Socket Chat app</h1>
        <div id="chatSection">
          <div className="chat-window"></div>
          <form className="chat-form" onSubmit={submitHandler}>
            <label className="chat-label">
              Enter a message:
              <input
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                className="chat-input"
              />
            </label>
            <input type="submit" className="chat-submit" value="enter" />
          </form>
        </div>
      </div>
    </>
  );
}
