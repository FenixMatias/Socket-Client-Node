const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        //sockets
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {}

        //Middleware
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();

        //Configuración de sockets
        this.sockets();

    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        //Cors
        this.app.use(cors());

        //Directorio publico
        this.app.use(express.static('public'));

    }

    routes() {

        //this.app.use(this.paths.users, require('../routes/users'));

    }

    sockets() {
        
        this.io.on('connection', socketController);
    }

    listen() {
        //iniciamos el servidor websocket
        this.server.listen(this.port, () => {
            console.log(`Servidor correindo en el puerto: ${this.port}`)
        });
        
    }

};

module.exports = Server;