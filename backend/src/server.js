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

const connectedUsers = {}; 

mongoose.connect("mongodb+srv://aleffe:aleffe@omnistack-7pvf4.mongodb.net/semana09?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology:  true,
});

io.on('connection', socket => {   // escuta as informações de todos os usuarios logados na aplicaçao 
    // socket.emit('hello', 'planeta'); /// emit/on conexão de ponta a ponta ocm frontend
 
    const { user_id } = socket.handshake.query;
 
    connectedUsers[user_id] = socket.id;
 });

 app.use((req, res, next) => {
     req.io = io;
     req.connectedUsers = connectedUsers; // passando para toda a palicação a configuração de requisção e resposta e os usuários conectados

    return next(); // diz para a palicação continuar, caso contrario ela não sairia de app.use (midlewere)
 })
//req.query = para filtros
//req.params = para edição e delete 
//req.body = para criação e edição de registros
//Sequelize = utilizar com sql server 

app.use(cors()); // passando o endereço limita a api forncer dados somente ao endereço informado 
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333); // aplicação pronta pra receber requisiçoes http e wesocket