const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../src/models');

const validateJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición.' 
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById( uid ); 
        if ( !user ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no exixte en DB'
            });
        }
        
        if ( !user.status ) {
            return res.status(401).json({
                msg: 'Token no valida - usuario con status: false'
            })
        }

        req.user = user;
        
        next();
        
    } catch (error) {
        
        res.status(401).json({
            msg: 'Token no valido.'
        })   
    }
}

module.exports = {
    validateJWT
}