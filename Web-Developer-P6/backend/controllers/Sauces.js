const { json } = require('body-parser');
const Sauce = require('../models/Sauces')

exports.AllSauces = (req, res,next) => {
  Sauce.find()
          .then(sauces => res.send(sauces))
          .catch(error => res.status(403).json({ error }));
  }
    

exports.AddSauce = (req, res,next) => {
   const sauce = JSON.parse(req.body.sauce)
   const newSauce = new Sauce ({
    ...sauce,
    imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
   newSauce.save() 
   .then(sauce => res.status(200).json({ message: "ok" }))
   .catch(error => res.status(403).json({ message: "Problème" }));
}

exports.SauceId = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
  .then(sauce => {
    return res.status(200).json(sauce)
  })
  .catch(error => res.status(403).json({error}));
}


exports.ModifySauce = (req, res, next) => { 
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'sauce modifiée !'}))
    .catch(error => res.status(403).json({ error }));

const Image = req.file !== null
 
if (!Image){
  const sauce = JSON.parse(req.body)
  
  sauce.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  Image.save()
}console.log(req.body)
}

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'sauce supprimée !'}))
      .catch(error => res.status(403).json({ error }));
  
}

exports.likeSauce = (req, res, next) => {
  const {likes,userId }= req.body
  console.log({likes,userId })
 
  
}