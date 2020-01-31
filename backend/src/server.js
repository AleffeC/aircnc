const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect("mongodb+srv://aleffe:aleffe@omnistack-7pvf4.mongodb.net/semana09?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology:  true,
});
//req.query = para filtros
//req.params = para edição e delete 
// req.body = para criação e edição de registros
//Sequelize = utilizar com sql server 

app.use(express.json());
app.use(routes);

app.listen(3333);

