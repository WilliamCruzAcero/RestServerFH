const express = require('express');
const cors = require('cors');
const router = require('../routes/user');



class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.user = '/user';

        //meddleweres
        this.middleweres();

        //rutas de aplicacion
        this.routes();
        
    }

    middleweres() {
        
        this.app.use(cors());
        this.app.use(express.static('public', {cacheControl: false}));
    }

    routes() {
       this.app.use(this.user, router)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto: ${this.port}`)
        })
    }

}

module.exports = Server;