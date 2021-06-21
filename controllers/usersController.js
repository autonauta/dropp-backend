const User = require("../models/Users");
const { errorHandler } = require("../helpers/dberrorHandler");
const { MqttClient } = require("mqtt");

exports.signup = (req, res) => {
  console.log("req.body", req.body); // { "name": "Cesar Alanis", "email": "test@test.com", "password":"test123", "phone": "4421818265" }
  const user = new User(req.body);
  user.save((error, user) => {
    console.log("reached signup endpoint");
    if (error) {
      return res.status(400).json({
        error: "Please check fields, there was an Error",
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.userExists = (phone) => {
  console.log("entered to userExists" + phone);
  // find the user based on phone
  User.findOne({ phone: "4421818264" }, (error, user) => {
    if (error || !user) {
      console.log("error from user search");
      const response = 0;
      return response;
    } else {
      const response = user;
      console.log(response);
      return user;
    }
  });
};
