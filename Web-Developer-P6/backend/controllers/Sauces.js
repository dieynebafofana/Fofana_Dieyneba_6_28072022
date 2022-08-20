const sauce = require('../models/Sauces')

/*exports.SaveSauces = (req, res, next) => {
  delete req.body._id;
      const sauce = new sauce({
        ...req.body
      })
      sauce.save()
          .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
          .catch(error => res.status(400).json({ error }));
   
}*/


exports.AllSauces = (req, res,next) => {
    sauce.find().then(
        (sauces) => {
          delete req.body._id;
          const sauce = new sauce({
            ...req.body
          })
          sauce.save()
          .then(() => res.status(201).json(sauces)({ message: 'sauce enregistrée !'}))
          .catch(error => res.status(400).json({ error }));

        }
      )
      .catch(
        () => {
          res.status(403).send(new Error('Database error!'));
        }
      );   
}


exports.AddSauce = (req, res,next) => {
   console.log(req.body)

   const sauce = JSON.parse(req.body.sauce)
  /*let EltSauce = {
    name: sauce.name,
    manufacturer: sauce.manufacturer,
    description: sauce.description,
    mainPepper: sauce.mainPepper,
    description : sauce.description,
    heat: sauce.heat,
    userId : sauce.userId,
  }*/
  console.log(sa)
   EltSauce.save() 
   .then(sauce => res.status(200).json(sauce))
   .catch(error => res.status(403).json({error}));
  
   //console.log(sauce, sauce.userId)
 
}

exports.SauceId = (req, res, next) => {
 
  sauce.findOne({ _id: req.params.id})
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(403).json({error}));
}

exports.deleteSauce = (req, res,next) => {
 
    sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'sauce supprimée !'}))
      .catch(error => res.status(400).json({ error }));
  
}

