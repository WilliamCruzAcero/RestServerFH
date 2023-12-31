const {Router} = require('express');
const { check } = require('express-validator');

const {
    validateFields,
    validateJWT,
    validateRole
} = require('../../middlewares');

const { 
    validRole,
    existsMail,
    existsUserById
} = require('../../helpers/db-valiaters');

const { 
    userGetAll,
    userPost,
    userPut,
    userdelete,
    userPatch, 
} = require('../controller/user');

const routerUser = Router();

    routerUser.get('/', userGetAll);
    routerUser.post('/', [
            check('name', 'El nombre es obligatorio').not().isEmpty(),
            check('lastname', 'El apellido es obligatorio').not().isEmpty(),
            check('email', 'El correo no es valido').isEmail(),
            check('email').custom( existsMail),
            check('password', 'La contraseña debe tener minimo 6 caracteres').isLength( {min: 6}),
            check('role').custom( validRole ),
            validateFields
        ],userPost);
    routerUser.put('/:id', [
            check('id', 'No es un ID valido').isMongoId(),
            check('id').custom( existsUserById ),
            check('role').custom( validRole ),
            validateFields
        ],userPut);
    routerUser.patch('/', userPatch);
    routerUser.delete('/:id',[
            validateJWT,
            // verifyRole,
            validateRole('ADMIN_ROLE', 'SALES_ROLE'),
            check('id', 'No es un ID valido').isMongoId(),
            check('id').custom( existsUserById ),
            validateFields
        ], userdelete);

module.exports = routerUser