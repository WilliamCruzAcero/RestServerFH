const {
    getCategories,
    getCategoryBvId,
    createCategory,
    updateCategory,
    deleteCategory
} = require('./categories');

const {
    loginPost,
    googleSignIn
} = require('./login');

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('./product');

const {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
} = require('./role')

const {
    search
} = require('./search')

const {
    fileUpload
} = require('./upload')

const {
    userGetAll,
    userGetById,
    userPost,
    userPut,
    userdelete
} = require('./user');



module.exports = {
    getCategories,
    getCategoryBvId,
    createCategory,
    updateCategory,
    deleteCategory,

    loginPost,
    googleSignIn,

    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,

    search,
    
    userGetAll,
    userGetById,
    userPost,
    userPut,
    userdelete,

    fileUpload,
    
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
}