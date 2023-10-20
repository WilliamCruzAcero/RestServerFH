const {Role, User, Category} = require('../src/models');

const validRole = async( role = '' ) => {

    const existsRole = await Role.findOne({role});

    if( !existsRole ) {
        throw new Error(`El rol ${role} no está registrado en la base de datos`);
    }
}

const existsMail = async( email = '' ) => {

    const mailExists = await User.findOne({ email });

    if ( mailExists ) {
        throw new Error(`El correo: ${email}, ya esta registrado`)
        
    }
}

const existsUserById = async( id ) => {

    const userExists = await User.findById(id);
    
    if ( !userExists ) {
        throw new Error(`El ID : ${id}, no existe`)
        
    }
}
const existsCategoryById = async( id ) => {

    const categoryExists = await Category.findById(id);
    
    if ( !categoryExists ) {
        throw new Error(`El ID : ${id}, no existe`)
        
    }
}

module.exports = {
    validRole,
    existsMail,
    existsUserById,
    existsCategoryById
}