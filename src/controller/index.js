const category = require('./categories');
const login = require('./login');
const product = require('./product');
const role = require('./role');
const search = require('./search');
const upload = require('./upload');
const user = require('./user');

module.exports = {
    ...category,
    ...login,
    ...product,
    ...role,
    ...search,
    ...upload,
    ...user
}