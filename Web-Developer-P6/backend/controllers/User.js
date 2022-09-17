const bcrypt = require("bcrypt");
const jsonWt = require("jsonwebtoken");
const User = require("../models/User");

//Signup

exports.signup = (req, res, next) => {
  console.log(req.body);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      console.log(user);
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(403).json({ message: "utilisateur" }));
    })
    .catch((error) => res.status(403).json({ error }));
};

//Login

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(403)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(403)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }
          res.status(200).json({
            userId: user._id,
            token: jsonWt.sign({ userId: user._id }, process.env.TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(403).json({ error }));
    })
    .catch((error) => res.status(403).json({ error }));
};
