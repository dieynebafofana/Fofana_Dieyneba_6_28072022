const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");

const app = express();

app.use(express.json());
const mongoose = require("mongoose");
const path = require("path");
const UserModel = require("./routes/User");

const userRoutes = require("./routes/User");
const sauceRoutes = require("./routes/Sauces");

const Url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.USER}?retryWrites=true&w=majority`;

mongoose
  .connect(Url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(helmet());

app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);


module.exports = app;
