const bcrypt = require('bcrypt');
const user = require('../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const User = new User({
          email: req.body.email,
          password: hash
        });
        User.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(403).json({ error }));
      })
      .catch(error => res.status(403).json({ error }));
  };

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(User => {
            if (!User) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: 'TOKEN'
                    });
                })
                .catch(error => res.status(403).json({ error }));
        })
        .catch(error => res.status(403).json({ error }));
 };
