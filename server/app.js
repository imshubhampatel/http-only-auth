require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Session = require("express-session");
const passportJWT = require("./config/passport_jwt_Strategy");
const passport = require("passport");

//? app
const app = express();
const PORT = 5000;

// setup chatsocket io

const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);
chatServer.listen(8000);

//? cors setup
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//? cookie parser
app.use(cookieParser());
//? connect database
const db = require("./config/mongoose");

//? body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//? passport setup
app.use(passport.initialize());

//? app routing
app.use("/", require("./routes"));

//? configure port server listening

app.listen(PORT, () => {
  console.log("server is running ");
});
