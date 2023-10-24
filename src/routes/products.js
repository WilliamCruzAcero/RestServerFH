const { Router } = require('express');

const { check } = require('express-validator');

const { 
    validateFields,
    validateJWT,
    verifyAdminRole
} = require('../../middlewares');

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controller/product');

const { existsProductoById, existsCategoryById } = require('../../helpers/db-valiaters');

const routerProduct = Router();

    // obtener todos los producto
    routerProduct.get('/', getProducts);
    // obtener un producto por ID
    routerProduct.get('/:id', [
        check('id', 'No es un ID de MOngo valido').isMongoId(),
        check('id').custom( existsProductoById ),
        validateFields
    ], getProductById);
    // crear producto - private - autorizados (ADMIN_ROLE)
    routerProduct.post('/', [
        validateJWT,
        verifyAdminRole,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('category', 'No es un id de Mongo').isMongoId(),
        check('category').custom( existsCategoryById ),
        validateFields
    ], createProduct);
    // actualizar producto - solo ADMIN
    routerProduct.put('/:id', [
        validateJWT,
        verifyAdminRole,
        check('id', 'No es un ID de MOngo valido').isMongoId(),
        check('id').custom( existsProductoById ),
        validateFields
    ], updateProduct);
    // borrar producto - solo Admin
    routerProduct.delete('/:id', [
        validateJWT,
        verifyAdminRole,
        check('id', 'No es un ID de MOngo valido').isMongoId(),
        check('id').custom( existsProductoById ),
        validateFields
    ], deleteProduct);

module.exports = routerProduct