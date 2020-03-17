const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const placesRouter = require("./api/routes/places");

mongoose.connect(
  "mongodb+srv://admin:1234@cluster0-9jhwf.mongodb.net/covid-19?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/places", placesRouter);

//for not found error
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

//for any other type error
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
});

// app.use((req, res, next) => {
//   res.status(200).json({
//     message: "Server is Running"
//   });
// });

module.exports = app;
