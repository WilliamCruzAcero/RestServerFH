const { Router } = require('express'); 
const { check } = require('express-validator');

const {
    fileUpload,
    // updateImgage,
    showImage,
    updateImgageCloudinary,
} = require('../controller');

const { validateFields, validateFileUpload } = require('../../middlewares');
const { allowedCollection } = require('../../helpers');

const routerUpload = Router();

    routerUpload.get('/:collection/:id',[
        check('id', 'No es un ID de Mongo valido').isMongoId(),
        check('collection').custom( c => allowedCollection( c, ['users', 'products']) ),
        validateFields
    ], showImage);
    routerUpload.post('/', validateFileUpload, fileUpload );
    routerUpload.put('/:collection/:id', [
        validateFileUpload,
        check('id', 'No es un ID de Mongo valido').isMongoId(),
        check('collection').custom( c => allowedCollection( c, ['users', 'products']) ),
        validateFields
    ], updateImgageCloudinary );
    // ], updateImgage);
        
module.exports = routerUpload;