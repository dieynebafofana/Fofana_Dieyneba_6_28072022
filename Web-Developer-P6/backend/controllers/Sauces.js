const { json } = require("body-parser");
const Sauces = require("../models/Sauces");
const Sauce = require("../models/Sauces");
const fs = require("fs");


//Affichage des sauces

exports.AllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.send(sauces))
    .catch((error) => res.status(403).json({ error }));
};

//Rajouter une sauce

exports.AddSauce = (req, res, next) => {
  const sauce = JSON.parse(req.body.sauce);
  const newSauce = new Sauce({
    ...sauce,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  newSauce
    .save()
    .then((sauce) => res.status(200).json({ message: "ok" }))
    .catch((error) => res.status(403).json({ message: "Problème" }));
};

exports.SauceId = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      return res.status(200).json(sauce);
    })
    .catch((error) => res.status(403).json({ error }));
};

//Modifier une sauce

exports.ModifySauce = (req, res, next) => {
  const editSauce = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  if (req.file) {
    Sauce.findOne({ _id: req.params.id })
      .then((imgObjet) => {
        const filename = imgObjet.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, (error) => {
          if (error) throw error;
        });
      })
      .catch((error) => res.status(403).json({ message: "error sauce" }));
  }

  Sauce.updateOne({ _id: req.params.id }, { ...editSauce, _id: req.params.id })
    .then(() => res.status(200).json({ message: "sauce modifiée !" }))
    .catch((error) => res.status(403).json({ error }));
};

//Supprimer une sauce

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((imgObjet) => {
      const filename = imgObjet.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "sauce supprimée !" });
          })
          .catch((error) => res.status(403).json({ error }));
      });
    })
    .catch((error) => {
      res.status(403).json({ message: "error" });
    });
};

//Like et dislike

exports.likeSauce = (req, res, next) => {
  const { like, userId } = req.body;

  Sauces.findOne({ _id: req.params.id })
    .then((SauceLike) => {
      if (!SauceLike.usersLiked.includes(userId) && like === 1) {
        Sauces.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: userId },
          }
        )
          .then(() => res.status(200).json({ message: "like ajouté !" }))
          .catch((error) => res.status(403).json({ message: "error" }));
      }

      if (SauceLike.usersLiked.includes(userId) && like === 0) {
        Sauces.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: userId },
          }
        )
          .then(() => res.status(200).json({ message: "pas de like" }))
          .catch((error) => res.status(403).json({ message: "error" }));
      }

      if (!SauceLike.usersDisliked.includes(userId) && like === -1) {
        Sauces.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: userId },
          }
        )
          .then(() => res.status(200).json({ message: "dislike ajouté" }))
          .catch((error) => res.status(403).json({ message: "error" }));
      }

      if (SauceLike.usersDisliked.includes(userId) && like === 0) {
        Sauces.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: userId },
          }
        )
          .then(() => res.status(200).json({ message: "pas de dislike" }))
          .catch((error) => res.status(403).json({ message: "error" }));
      }
    })
    .catch((error) => res.status(403).json({ error }));
};
