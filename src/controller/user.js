const {request, response} = require('express');

const userGet = (req, res = response ) => {

    const {nombre, edad, estado} = req.query;

    res.json({
        msg: 'get API - controller ;)',
        nombre,
        edad,
        estado
    })
}

const userPost = (req, res = response) => {

    const {nombre, apellido, id, edad } = req.body;
    res.json({
        msg: 'post API - controller ;)',
        nombre,
        apellido,
        id,
        edad
    })
}

const userPut = (req = request, res = response) => {

    const {id} = req.params;

    res.json({
        msg: 'put API - controller ;)',
        id
    })
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller ;)'
    })
}

const userdelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controller ;)'
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userdelete
}