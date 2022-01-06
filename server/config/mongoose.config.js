const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/recipe_db')
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong with the database'));