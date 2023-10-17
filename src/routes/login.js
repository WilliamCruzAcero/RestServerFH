const { Router } = require('express');

const {loginPost} = require('../controller/login');
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares/validate-fields');

const routerLogin = Router();

    routerLogin.post('/',[
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validateFields
    ],loginPost)

module.exports = routerLogin

