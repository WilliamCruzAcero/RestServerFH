const { response } = require("express");

const { searchUsers, searchProducts, searchCategory } = require("../../helpers/search");

// coleciones permitidas
const collectionsAllowed = [
    'users',
    'products',
    'categories',
    'roles'
];

// buscar en DB
const search = (req, res = response) => {

    const { collection, term } = req.params;

    if ( !collectionsAllowed.includes( collection ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${collectionsAllowed}`
        })
    }
    switch (collection) {
        case 'users':
            searchUsers( term, res );
            break;
        case 'products':
            searchProducts( term, res);
            break;
        case 'categories':
            searchCategory( term, res);
            break;
    
        default:
            res.status(500).json({
                msg: 'Busqueda no implementada.'
            })
            break;
    }
}

module.exports = {
    search
}