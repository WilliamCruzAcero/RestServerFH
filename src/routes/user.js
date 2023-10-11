const {Router} = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../../middlewares/validate-fields');
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
    // userGetById
} = require('../controller/user');

const router = Router();

    router.get('/', userGetAll);
    // router.get('/:id',[
    //         check('id', 'No es un ID valido').isMongoId(),
    //         check('id').custom( existsUserById ),
    //         validateFields
    //     ],userGetById);
    router.post('/', [
            check('name', 'El nombre es obligatorio').not().isEmpty(),
            check('lastname', 'El apellido es obligatorio').not().isEmpty(),
            check('email', 'El correo no es valido').isEmail(),
            check('email').custom( existsMail),
            check('password', 'La contraseña debe tener minimo 6 caracteres').isLength( {min: 6}),
            check('role').custom( validRole ),
            validateFields
        ],userPost);
    router.put('/:id', [
            check('id', 'No es un ID valido').isMongoId(),
            check('id').custom( existsUserById ),
            check('role').custom( validRole ),
            validateFields
        ],userPut);
    router.patch('/', userPatch);
    router.delete('/:id',[
            check('id', 'No es un ID valido').isMongoId(),
            check('id').custom( existsUserById ),
            validateFields
        ], userdelete);

module.exports = router