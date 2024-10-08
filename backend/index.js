const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authroutes.js");
const mealRouter = require("./routes/mealroutes.js");
require("dotenv").config();
 
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: ["https://mealify-vercel.vercel.app", "http://localhost:3000"],
  credentials: true,
  methods: "GET, POST, OPTIONS, PUT, DELETE",
  allowedHeaders: ["Content-Type", "X-Auth-Token", "Origin", "Authorization"],
};
 
app.use(cors(corsOptions));

mongoose
  .connect(
   `mongodb+srv://sanketbhosle:sanketbhosle@cluster0.anj8aqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    // `mongodb+srv://knightclub538:gaurav5922@cluster0.czvsxsu.mongodb.net/cpnew?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("CONNECTED TO MONGODB");
  })
  .catch((err) => {
    console.error("FAILED TO CONNECT TO MONGODB");
    console.error(err);
  });

app.use("/api/", authRouter);
app.use("/api/", mealRouter);
 
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Mealify");
});

app.listen(PORT, () => {
  console.log("server is starting on "+PORT);
});
