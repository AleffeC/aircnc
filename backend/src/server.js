const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

const app = express();

mongoose.connect("mongodb+srv://aleffe:aleffe@omnistack-7pvf4.mongodb.net/semana09?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology:  true,
});
//req.query = para filtros
//req.params = para edição e delete 
//req.body = para criação e edição de registros
//Sequelize = utilizar com sql server 

app.use(cors()); // passando o endereço limita a api forncer dados somente ao endereço informado 
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333);