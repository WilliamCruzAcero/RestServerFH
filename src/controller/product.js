const { response } = require('express');
const { Product } = require('../models');

// Obtener todos los productos - paginado - total - populate
const getProducts = async(req, res = response) => {

    const { limit = 2, desde = 0 } = req.query;
    const query = {status: true}

    const [ totalProducts, products ] = await Promise.all([
        Product.countDocuments(query),
        Product.find()
                .populate('user', 'name')
                .populate('category', 'name')
                .skip(desde)
                .limit(limit)
    ])

    res.json({
        totalProducts,
        products
    })
    
}

// obtener un producto - populate
const getProductById = async(req, res = response) => {

    const { id } = req.params;

    const product = await Product.findById( id )
                    .populate('user', 'name')
                    .populate('category', 'name');
    
    if ( !product.status ) {
        return res.status(401).json({
            msg: 'Producto bloqueado, hable con el admistrador'
        })
    }

    res.json({ product });
}

// Crear productp
const createProduct = async(req, res = response) => {


    const {name, price, category, description} = req.body;
    
    const productDB = await Product.findOne( {name} );
    
    // verificar se la producto existe
    if ( productDB ) {
        return res.status(400).json({
            msg: `El producto  ya existe`
        })   
    }

    //generar data a guardar
    const data = {
        
        name: name.toUpperCase(),
        price,
        category,
        description,
        user: req.user._id
    }

    const product = new Product(data);
    await product.save() 

    res.status(201).json({
        product
    }) 
}

// actualizar producto
const updateProduct = async(req, res = response) => {

    const { id } = req.params;
    const { status, user, ...data } = req.body;
    
    if ( data.name ) {
        data.name = data.name.toUpperCase();
    }
    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate( id, data, {new: true})
                                                .populate('user', 'name')
                                                .populate('category', 'name');

    res.json({
        msg: 'Producto actualizado con exito',
        product
    })
}

// borrar producto cambiando el estado
const deleteProduct = async(req, res = response) => {

    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndUpdate( id, { status: false}, {new: true});
    
    res.json({ 
        msg: 'produsto barrado',
        deleteProduct
    });
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}