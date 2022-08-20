const express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const path = require('path');
const UserModel = require('./routes/User');
const SauceModel = require('./routes/Sauces');

const userRoutes = require('./routes/User');
const sauceRoutes = require('./routes/Sauces');

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
app.use('/api/sauces',sauceRoutes);
app.use('/api/sauces/:id',sauceRoutes);
app.delete('/api/sauces/:id',sauceRoutes);
app.use('/images', express.static(path.join(__dirname,'images')));


module.exports = app;