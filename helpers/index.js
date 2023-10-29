const allowedCollection = require('./collections-validaters');
const dbValidators = require('./db-validaters');
const fileUpload = require('./file-upload');
const generateJTW = require('./generate-jwt');
const googleVerity = require('./google-verify');
const search = require('./search');

module.exports = {
    ...allowedCollection,
    ...dbValidators,
    ...fileUpload,
    ...generateJTW,
    ...googleVerity,
    ...search,
}