const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validateFields,
    validateJWT, 
    verifyAdminRole
} = require('../../middlewares');

const { 
    getCategories,
    getCategoryBvId,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controller');

const { existsCategoryById } = require('../../helpers/db-valiaters');

const routerCategories = Router();

    //obtener todas las categorias
    routerCategories.get('/', getCategories);
    //obtner una categoria por id 
    routerCategories.get('/:id', [
            check('id', 'No es un ID de MOngo valido').isMongoId(),
            check('id').custom( existsCategoryById ),
            validateFields
        ],getCategoryBvId);
    //crear categoria - privado - cuaquier persona con token valido
    routerCategories.post('/', [
            validateJWT,
            check('name', 'El nombre es obligatorio').not().isEmpty(),
            validateFields
        ], createCategory);
    //actualizar - privado - cualquiera con toquen valido
    routerCategories.put('/:id', [
            validateJWT,
            check('id', 'No es un ID valido').isMongoId(),
            check('id').custom( existsCategoryById ),
            check('name', 'El nombre es obligatorio').not().isEmpty(),
            validateFields 
        ],updateCategory);
    //borrar una categoria - solo el ADMIN puede hacerlo
    routerCategories.delete('/:id', [
            validateJWT,
            verifyAdminRole,
            check('id', 'No es un ID valido').isMongoId(),
            check('id').custom( existsCategoryById ),
            validateFields       
        ],deleteCategory);

module.exports = routerCategories