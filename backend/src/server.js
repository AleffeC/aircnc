const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server  =http.Server(app); /// separando servidor http em duas variaveis diferentes 
const io = socketio(server);

io.on('connection', socket => {   // escuta as informações de todos os usuarios logados na aplicaçao 
    console.log('Usaidufahfiajn ', socket.id);
});

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

server.listen(3333); // aplicação pronta pra receber requisiçoes http e wesocket