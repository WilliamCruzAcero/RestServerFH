const { response } = require("express");


const getUpload = (req, res = response) => {
    
    res.json({
        msg: 'HOLA'
    })
}

module.exports = {
    getUpload
}