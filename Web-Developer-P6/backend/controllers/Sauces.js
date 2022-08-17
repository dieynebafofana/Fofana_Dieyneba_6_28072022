//const sauce = require('../models/Sauces')

/*exports.AllSauces = (req, res,next) => {
    sauce.find().then(
        (sauces) => {
          const mappedSauces = sauces.map((sauce) => {
            sauce.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + sauce.imageUrl;
            return product;
          });
          res.status(200).json(mappedSauces);
        }
      ).catch(
        () => {
          res.status(500).send(new Error('Database error!'));
        }
      );   
}*/

