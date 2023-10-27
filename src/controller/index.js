
const {
    loginPost,
    googleSignIn
} = require('./login');

const {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
} = require('./role')

const {
    getCategories,
    getCategoryBvId,
    createCategory,
    updateCategory,
    deleteCategory
} = require('./categories');

const {
    createProduct
} = require('./product');

const {
    userGetAll,
    userGetById,
    userPost,
    userPut,
    userPatch,
    userdelete
} =require('./user');

const {
    search
} = require('./search')

module.exports = {
    loginPost,
    googleSignIn,
    getCategories,
    getCategoryBvId,
    createCategory,
    updateCategory,
    deleteCategory,
    createProduct,
    userGetAll,
    userGetById,
    userPost,
    userPut,
    userPatch,
    userdelete,
    search,
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
}