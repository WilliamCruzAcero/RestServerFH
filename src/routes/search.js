const { Router } = require('express');
const { search } = require('../controller');

const routerSearch = Router();

    routerSearch.get('/:collection', search);


module.exports = routerSearch; 