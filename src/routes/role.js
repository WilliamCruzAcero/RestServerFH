const { Router } = require('express');
const { check } = require('express-validator');

const SP_R = process.env.SP_R

const { 
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
} = require('../controller');

const { 
    validateJWT,
    validateFields,
    validateRole,
} = require('../../middlewares');

const { existsRoleById } = require('../../helpers');

const routerRole = Router();

    // obtener todos los roles
    routerRole.get('/', getRoles);
    routerRole.get('/:id', [
        check('id', 'No es un ID de MOngo valido').isMongoId(),
        check('id').custom( existsRoleById ),
        validateFields
    ], getRoleById);
    // Crear Role
    routerRole.post('/', [
        validateJWT,
        validateRole(SP_R),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        validateFields
    ], createRole);
    //Actualizar Role
    routerRole.patch('/:id', [
        validateJWT,
        validateRole(SP_R),
        check('id', 'No es un ID de Mongo valido').isMongoId(),
        check('id').custom( existsRoleById ),
        validateFields
    ], updateRole );
    routerRole.delete('/:id', [
        validateJWT,
        validateRole(SP_R),
        check('id', 'No es un ID de Mongo valido').isMongoId(),
        check('id').custom( existsRoleById ),
        validateFields
    ], deleteRole)

module.exports = routerRole;