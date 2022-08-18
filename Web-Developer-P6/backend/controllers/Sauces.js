const sauce = require('../models/Sauces')

exports.AllSauces = (req, res,next) => {
    sauce.find().then(
        (sauces) => {
          // const mappedSauces = sauces.map((sauce) => {
          //   sauce.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + sauce.imageUrl;
          //   return sauce;
          // });
          res.status(200).json(sauces);
        }
      ).catch(
        () => {
          res.status(403).send(new Error('Database error!'));
        }
      );   
}

exports.AddSauce = (req, res,next) => {
   console.log(req.body)

   const sauce = JSON.parse(req.body.sauce)
   console.log(sauce, sauce.userId)
   res.status(401).json({ message: "test" });
}

