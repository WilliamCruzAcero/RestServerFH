const { Schema, model} = require('mongoose');

const RoleSchema = Schema({

    role: {
        type: String,
        required: [true, 'Elija un rol']
    }
})

module.exports = model('Role', RoleSchema)