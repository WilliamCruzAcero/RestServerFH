const express = require('express');
const cors = require('cors');

const routerUser = require('../routes/user');
const routerLogin = require('../routes/auth');

const { dbConnection } = require('../../database/config');



class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.user = '/user';
        this.login = '/auth'

        //Conectar a base de datos

        this.conectarDB();

        //meddleweres
        this.middlewares();

        //rutas de aplicacion
        this.routes();
        
    }

    async conectarDB() {
        await dbConnection();      
    }

    middlewares() {
        
        this.app.use( cors() );
        //lectura y parseo del body
        this.app.use( express.json() );
        this.app.use( express.static('public', {cacheControl: false}) );
    }

    routes() {
       this.app.use(this.user, routerUser)
       this.app.use(this.login, routerLogin)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto: ${this.port}`)
        })
    }

}

module.exports = Server;