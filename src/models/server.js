const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../../database/config');

const routerUser = require('../routes/user');
const routerLogin = require('../routes/auth');
const routerCategories = require('../routes/categories');
const routerProduct = require('../routes/products');
const routerSearch = require('../routes/search');
const routerRole = require('../routes/role');

class Server {
     
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.user = '/user';
        this.search = '/search';
        this.login = '/auth';
        this.categories = '/categories';
        this.roles = '/roles';
        this.products = '/product'

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
        this.app.use(this.categories, routerCategories);
        this.app.use(this.login, routerLogin);
        this.app.use(this.products, routerProduct);
        this.app.use(this.roles, routerRole);
        this.app.use(this.search, routerSearch);
        this.app.use(this.user, routerUser);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto: ${this.port}`)
        })
    }

}

module.exports = Server;