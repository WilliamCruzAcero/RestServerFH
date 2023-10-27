const { Router } = require('express'); 
const { fileUpload } = require('../controller');
 

const routerUpload = Router();

    routerUpload.post('/', fileUpload );
        
module.exports = routerUpload;