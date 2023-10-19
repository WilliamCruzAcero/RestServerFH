const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../../helpers/generate-jwt');
const { googleVerify } = require('../../helpers/google-verify');

const loginPost = async(req, res = response) => {

    const {email, password} = req.body;

    try {

        const user = await User.findOne({ email });
        console.log({user})
        //verificar si el correo existe
        if( !user ) {
           return res.status(400).json({
                msg: 'El correo o la contraseña no es correcto -- email'
           })
        }

        //Verificar si el usuario esta activo
        if( !user.status ) {
           return res.status(400).json({
                msg: 'El correo no esta activo'
           })
        }

        //verificar contraseña
        const validPassword = bcrypt.compareSync( password, user.password);
        if( !validPassword ) {
            
            return res.status(400).json({
                 msg: 'El correo o la contraseña no es correcto -- password'
            })
        }

        //generar un JWT
        const token = await generateJWT( user.id );
        
        res.json({
           user,
           token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
        
    }
}

const googleSignIn = async( req, res = response ) => {
    
    const { id_token } = req.body;
    // console.log(id_token)
    try {
        const { name, lastname, email, image } = await googleVerify( id_token );
        
        let user = await User.findOne({ email });

        if ( !user ) {
            //crear usuario si no existe
            const data = {
                name,
                lastname,
                email,
                password: ';)',
                image,
                google: true
            };
            
            user = new User( data );
            await user.save();
        }
        
        // si tiene status: false
        if ( !user.status ) {
            return res.status(401).json({
                msg: 'Usuario bloqueado, hable con el adminstrador'
            });
        }

        //generar un JWT
        const token = await generateJWT( user.id );
        
        res.json({
            user,
            token
        }) 

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Internal Server Error' 
        })
    }
} 

module.exports = {
    loginPost,
    googleSignIn
}