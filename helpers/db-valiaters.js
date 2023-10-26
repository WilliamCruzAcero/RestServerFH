const {
    Role,
    User,
    Category,
    Product
} = require('../src/models');

const validRole = async( name = '') => {
   
    const existsRole = await Role.findOne({name});
    
    if( !existsRole ) {

        throw new Error(`El rol ${name} no está registrado en la base de datos`);
    }
    if ( !existsRole.status ) {
        throw new Error('Role no valido - role con status: false')
    } 
}

const existsRoleById = async( id ) => {

    const roleExists = await Role.findById(id);
    
    if ( !roleExists ) {
        throw new Error(`El ID : ${id}, no existe`)
        
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

const existsProductoById = async( id ) => {

    const productExists = await Product.findById(id);
    
    if ( !productExists ) {
        throw new Error(`El ID : ${id}, no existe`)
        
    }
}

module.exports = {
    validRole,
    existsMail,
    existsRoleById,
    existsUserById,
    existsCategoryById,
    existsProductoById,
}