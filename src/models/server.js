const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../../database/config');

const {
    routerCategories,
    routerLogin,
    routerProduct,
    routerRole,
    routerSearch,
    routerUpload,
    routerUser,
} = require('../routes');

class Server {
     
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.categories = '/categories';
        this.login = '/login';
        this.products = '/product';
        this.role = '/role';
        this.search = '/search';
        this.upload = '/uploads';
        this.user = '/user';

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
        // cors
        this.app.use( cors() );
        //lectura y parseo del body
        this.app.use( express.json() );
        // Directorio publico
        this.app.use( express.static( 'public', {cacheControl: false} ) );
        // File upload - carga de archivo
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true
        }));
    }

    routes() {
        this.app.use( this.categories, routerCategories );
        this.app.use( this.login, routerLogin );
        this.app.use( this.products, routerProduct );
        this.app.use( this.role, routerRole );
        this.app.use( this.search, routerSearch );
        this.app.use( this.upload, routerUpload );
        this.app.use( this.user, routerUser );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto: ${this.port}`)
        })
    }
}

module.exports = Server;