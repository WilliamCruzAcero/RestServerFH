
const {
    loginPost,
    googleSignIn
} = require('./auth');

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

}