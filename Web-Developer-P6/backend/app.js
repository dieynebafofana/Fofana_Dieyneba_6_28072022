const express = require('express');

const app = express();
app.use(express.json());
const mongoose = require('mongoose');

const UserModel = require('./models/User');
const SauceModel = require('./models/Sauce');

const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://hot_takes:zYVuGoDWOaP7ZbRk@cluster0.grshl.mongodb.net/hot_takes?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/auth', userRoutes);

// app.use((req, res) => {
//    res.json({ message: 'Votre requête a bien été reçue !' }); 
// });

module.exports = app;