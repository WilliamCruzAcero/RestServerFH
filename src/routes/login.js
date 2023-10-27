const { Router } = require('express');

const { loginPost, googleSignIn } = require('../controller');
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares');

const routerLogin = Router();

    routerLogin.post('/',[
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validateFields
    ], loginPost)
    
    routerLogin.post('/google',[
        check('id_token', 'id_token es necesario').not().isEmpty(),
        validateFields
    ], googleSignIn)

module.exports = routerLogin;

