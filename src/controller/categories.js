const { response } = require("express");
const { Category } = require("../models");

// Obtener todas categorias - paginado - total - populate
const getCategories = async( req, res = response) => {
      
    const { limit = 2, desde = 0 } = req.query;
    const query = {status: true}

    const [totalCategories, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find()
                .populate('user', 'name')
                .skip(desde)
                .limit(limit)

    ])
    res.json({
        totalCategories,
        categories
    })
}

// obtener una cateregoria - populate
const getCategoryBvId = async( req, res = response) => {
      
    const { id } = req.params;

    const categoria = await Category.findById( id ).populate('user', 'name');
   
    // si tiene status: false
    if ( !categoria.status ) {
        return res.status(401).json({
            msg: 'Categoria bloqueada, hable con el adminstrador'
        });
    }

    res.json({ categoria })
}

// Crear categoria
const createCategory = async( req, res = response) => {
    
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne( {name} );

    // verificar se la categoria existe
    if ( categoryDB ) {
        return res.status(400).json({
            msg: `La categoria ${categoryDB.name} ya existe`
        })   
    }

    //generar data a guardar
    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data);
    await category.save() 

    res.status(201).json({
        category
    })
}

// actualizar categoria
const updateCategory = async( req, res = response) => {
      
    const { id } = req.params;
    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate( id, data, { new: true } ).populate('user', 'name');
    
    res.json({
        msg: 'Actualizado con exito',
        category
    })
}

//borrar catergoria cambiando el estado
const deleteCategory = async( req, res = response) => {
    
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate( id, {status : false}, {new: true});
    
    res.status(200).json({
       category
    })
}

module.exports = {
    getCategories,
    getCategoryBvId,
    createCategory,
    updateCategory,
    deleteCategory
}