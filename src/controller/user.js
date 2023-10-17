const {request, response} = require('express');
const bcrypt = require('bcryptjs')

const User = require('../models/user');

const userGetAll = async(req, res = response ) => {

    const { limit = 2, desde = 0 } = req.query;
    const query = {status: true}

    const [totalUsers, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(desde)
        .limit(limit)
    ])

    res.json({
        totalUsers,
        users
    })
}

// const userGetById = async(req, res = response ) => {

//     const { id } = req.params;
    
//     const userById = User.findOne(id)
//     const user = JSON.stringify(userById)

//     res.json({ user })
// }

const userPost = async(req, res = response) => {

    const { name, lastname, email, password, role } = req.body;
    const user = new User( {name, lastname, email, password, role} );

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt)
    await user.save();

    res.json({
        user
    })
}

const userPut = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    if ( password ) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate( id, resto )

    res.json(user);
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller ;)'
    })
}

const userdelete = async(req, res = response) => {
    const {id} = req.params;

    //borrar de forma fisica
    // const user = await User.findByIdAndDelete(id);
    const user = await User.findByIdAndUpdate(id, {status: false});
   
    res.json({
        user,
    })
}

module.exports = {
    userGetAll,
    // userGetById,
    userPost,
    userPut,
    userPatch,
    userdelete
}