const { Router } = require('express'); 
const { getUpload } = require('../controller/upload');
 

const routerUpload = Router();

    routerUpload.get('/', getUpload);

module.exports = routerUpload;