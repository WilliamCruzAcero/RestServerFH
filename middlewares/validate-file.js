const { response } = require("express");

const validateFileUpload = ( req, res = response, next ) => {

    if ( !req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({
            msg: 'No archivos que subir - validateFile.'
        });
    }

    next();
}

module.exports = {
    validateFileUpload
}