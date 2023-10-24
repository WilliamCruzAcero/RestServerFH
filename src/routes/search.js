const { Router } = require('express');
const { search } = require('../controller');

const routerSearch = Router();

    routerSearch.get('/:collection/:term', search);


module.exports = routerSearch; 