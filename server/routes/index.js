const express = require("express");
const formidable = require("formidable");
const router = express.Router();
const User = require("../models/userSchema");
const userAuthController = require("../controllers/userAuth");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("user", { session: false }),
  (req, res) => {
    console.log(req.user);
    console.log("hey");
    res.send("connected router");
  }
);

//? auth routes ->

router.post("/api/sign-up", userAuthController.signUp);
router.post("/api/sign-in", userAuthController.signIn);
router.get("/api/v1/users/refresh-token", userAuthController.refreshToken);

module.exports = router;
