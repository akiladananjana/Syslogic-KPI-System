const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { render } = require("../app");

const jsonSecret = "this-is-my-very-secure-json-web-token-secret-key";

const checkPassword = async (candidatePassword, password) => {
  return await bcrypt.compare(candidatePassword, password);
};

// Create and Send JWT
const createSendJWT = (id, statusCode, res) => {
  const token = jwt.sign({ id: id }, jsonSecret, {
    expiresIn: "30d",
  });

  // Send JWT as a Cookie
  const cookieOptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    secure: false,
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token: token,
  });
};

// Authentication Process
exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // 1) Check if email and password are exists in request
  if (!email || !password)
    return next(
      res
        .status(404)
        .json({ status: "Error : No Email or Password in Request...!" })
    );

  // 2) Check if email and password are correct againt the DB
  const authUserDoc = await User.findOne({ email });

  // console.log(await checkPassword(password, authUserDoc.password));
  if (!authUserDoc || !(await checkPassword(password, authUserDoc.password))) {
    return next(
      res
        .status(404)
        .json({ status: "Error : Invalid Username or Password...!" })
    );
  }

  // 3) If everything is OK, then send JWT to End User
  createSendJWT(authUserDoc.id, 201, res);
};

// Log Out Process

exports.logout = (req, res, next) => {
  console.log("AAA");
  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  };

  res.cookie("jwt", " ", cookieOptions);
  res.status(200).json({
    status: "success",
  });
};

//SignUp Process
exports.signUp = async (req, res) => {
  try {
    // console.log(req.body);
    req.body.passwordLastChanged = Date.now();
    const newUser = await User.create(req.body);

    // createSendJWT(newUser.id, 200, res);

    res.status(200).json({
      status: "Success",
      data: "User Created",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

// Route Protection
exports.protect = async (req, res, next) => {
  try {
    let token = undefined;
    // 1) Check if token available in the header
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies) {
      token = req.cookies.jwt;
    }

    // const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      // return res.status(401).json({
      //   status: "Failed",
      //   message: "You are not logged In, Please logIn to access Dashboard...!",
      // });

      return res.render("login");
    }

    // 2) Token Verification
    const decoded = await jwt.verify(token, jsonSecret);

    // 3) Check if user still exists
    const userDetails = await User.findById(decoded.id);

    if (!userDetails) {
      return res.render("login");
      // return res.status(401).json({
      //   status: "Fail",
      //   message:
      //     "User is not available in our database, Sign Up to access tours...!",
      // });
    }

    // // 4) Check if user changed the password after the token was issued
    // const JWTTimestamp = decoded.iat;
    // const userPasswordLastChangedTimestamp =
    //   userDetails.passwordLastChanged.getTime() / 1000;

    // if (userPasswordLastChangedTimestamp > JWTTimestamp) {
    //   return res.status(401).json({
    //     status: "Fail",
    //     message: "Password was changed, Please log In again...!"
    //   });
    // }

    // console.log(JWTTimestamp, userPasswordLastChangedTimestamp);

    // Get all companies related to specific User ID
    const companyList = await User.aggregate([
      {
        $match: { _id: new mongoose.mongo.ObjectId(userDetails._id) },
      },
      {
        $lookup: {
          from: "companies",
          localField: "_id",
          foreignField: "userId",
          as: "companies",
        },
      },
    ]);

    const companyData = companyList[0].companies;

    req.companyDetails = companyData;
    req.userDetails = userDetails;

    next();
  } catch (error) {
    return res.render("login");
  }
};

exports.redirectLoggedInUsersToDashboard = async (req, res, next) => {
  try {
    let token = undefined;
    // 1) Check if token available in the header
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next();
    }

    // 2) Token Verification
    const decoded = await jwt.verify(token, jsonSecret);

    // 3) Check if user still exists
    const userDetails = await User.findById(decoded.id);

    if (!userDetails) {
      return next();
    }

    res.redirect(301, "/dashboard");
  } catch (error) {
    return next();
  }
};
