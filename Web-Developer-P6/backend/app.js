const express = require('express');

const app = express();
app.use(express.json());
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://hot_takes:zYVuGoDWOaP7ZbRk@cluster0.grshl.mongodb.net/hot_takes?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});


module.exports = app;