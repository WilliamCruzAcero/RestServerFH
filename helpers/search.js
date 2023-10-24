const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { User, Product, Category } = require("../src/models");

const searchUsers = async( term = '', res = response) => {

    // buscar con Id de mongo
    const isMongoId = ObjectId.isValid( term );

    if ( isMongoId ) {
        const user = await User.findById( term );
        res.json({
            results: (user) ? [user] : []
        });
    }

    //expresion regular para que no diference mayusculas de minusculas
    const regex = new RegExp( term, 'i' );

    // buscar con nombre 
    const users = await User.find({
        $or: [{ name: regex }, { email: regex, }],
        $and: [{ status: true }]
    });
    
    res.json({
        results: users
    });
}

const searchProducts = async( term = '', res = response) => {

    // buscar con Id de mongo
    const isMongoId = ObjectId.isValid( term );

    if ( isMongoId ) {
        const product = await Product.findById( term );
        res.json({
            results: (product) ? [product] : []
        });
    }

    //expresion regular para que no diference mayusculas de minusculas
    const regex = new RegExp( term, 'i' );

    // buscar con nombre 
    const products = await Product.find({ name: regex, status: true })
                            .populate('user', 'name')                        
                            .populate('category', 'name');
    
    res.json({
        results: products
    });
}

const searchCategory = async( term = '', res = response) => {
   
    // buscar con Id de mongo
    const isMongoId = ObjectId.isValid( term );

    if ( isMongoId ) {
        const category = await Category.findById( term );
        
        res.json({
            results: (category) ? [ category ] : []
        });
    }

    //expresion regular para que no diference mayusculas de minusculas
    const regex = new RegExp( term, 'i' );

    // buscar con nombre 
    const categories = await Category.find({ name: regex, status: true })
                        .populate('user', 'name');
    
    res.json({
        results: categories
    });
}

module.exports = {
    searchUsers,
    searchProducts,
    searchCategory
}