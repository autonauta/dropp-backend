const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
var mqtt = require("mqtt");
const Delivery = require("./models/Delivery");
const User = require("./models/Users");

//use methods of libraries
const server = express();
require("dotenv").config();

//Middlewares
server.use(morgan("dev"));
server.use(bodyParser.json());

//MQTT CLIENT SETUP

var options = {
  clientId: "SERVERLTMX001",
  username: process.env.BROKER_USER,
  password: process.env.BROKER_PASSWORD,
};
console.log(options);
var mqttClient = mqtt.connect(process.env.BROKER, options);

function newDelivery(topic, message) {
  const msg = JSON.parse(message);
  const courier = msg.courier;
  const phone = msg.phone;
  const size = msg.size;
  const id = msg.hive_id;
  console.log(`newDelivery: Delivery request arrived from ${id}`);
  const searchCondition = { phone: phone };
  User.findOne(searchCondition, (error, user) => {
    if (error || !user) {
      console.log("userExists: User does not exist");
      mqttClient.publish(
        process.env.PUB_TOPIC + id,
        `{"message": "response", "user_phone": "0", "user_name":"0"}`
      );
    } else {
      const toSendMessage = `{"message": "response", "user_phone": "${user.phone}", "user_name":"${user.name}"}`;
      mqttClient.publish(process.env.PUB_TOPIC + id, toSendMessage);
      const delivery = new Delivery(msg);
      delivery.save((err, data) => {
        if (err) return errorHandler(err);
        console.log("Delivery created");
        console.log(data);
      });
    }
  });
}

mqttClient.on("connect", () => {
  console.log("MQTT BROKER connected");
  mqttClient.subscribe(process.env.SUB_TOPIC, { qos: 1 });
});

mqttClient.on("error", function (error) {
  console.log("Can't connect " + error);
});

mqttClient.on("message", newDelivery);

//DB SETUP
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("droppDB database connected");
  });

//Falta terminar el controlador de recepcion de mensajes
//Routes Setup
server.use("/api/pinhive", require("./routes/pinhive"));
server.use("/api/users", require("./routes/users"));
server.use("/api/delivery", require("./routes/delivery"));
//Start server listening
const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Dropp API core listening on port ${port}`);
});
