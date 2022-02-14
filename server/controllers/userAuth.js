const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

module.exports.signUp = async (req, res) => {
  console.log("req.body", req.body);
  const { name, password } = req.body;

  try {
    let user = await User.findOne({ name: name });
    //? if user found
    console.log(user);
    if (user) {
      return res.status(403).json({
        success: false,
        data: { message: "User already registered" },
      });
    }

    //? if user not found
    let registeredUser = await User.create(req.body);

    //? returning the response
    return res.status(201).json({
      success: true,
      data: { message: "User Successfully registered" },
    });

    //? error found
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: { message: "User not registered" },
    });
  }
};

module.exports.signIn = async (req, res) => {
  let { name, password } = req.body;
  console.log(req.body);

  try {
    let user = await User.findOne({ name });
    console.log(user);
    if (!user) {
      return res.status(403).json({
        success: false,
        data: { message: "user not registered", isLoggedIn: false },
      });
    }
    let accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: 1000 * 60, //? 1 minute access-token
      }
    );
    let refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: 1000 * 60 * 2, //? 2 minutes refresh-token
      }
    );

    res.cookie("refreshToken", refreshToken, {
      sameSite: "strict",
      path: "/api/v1/users/refresh-token",
      expire: 1000 * 60 * 60 * 24 * 7,
      secure: true,
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      data: {
        message: "Logged in successfully",
        token: accessToken,
        isLoggedIn: true,
      },
    });

    //? error handling
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: { message: "Internal Server Error", err },
    });
  }
};

// refresh-token verification from httponly cookie

module.exports.refreshToken = async (req, res) => {
  console.log("called d");
  let refreshToken = req.cookies.refreshToken;
  console.log(refreshToken);

  try {
    if (!refreshToken) {
      return res.status(404).json({
        success: false,
        data: { message: "Please login or Register first", isLoggedIn: false },
      });
    }

    let isValidate = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (isValidate && isValidate._id) {
      //? creating new accesstoken
      let accessToken = jwt.sign(
        { _id: isValidate._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 1000 * 60 } //  1 minute access-token
      );

      return res.status(200).json({
        success: true,
        data: { isLoggedIn: true, token: accessToken },
      });
    }

    return res.status(404).json({
      success: false,
      data: { message: "Please login or Register first", isLoggedIn: false },
    });
  } catch (error) {
    console.log(error.expiredAt);
  }
};

module.exports.home = async (req, res) => {
  return res.status("permission authorised");
};
