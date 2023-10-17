const {Schema, model} = require('mongoose');

const UserSchena = Schema({
    name: {
        type: String,
        requered: [true, 'El nombre es requerido']
    },
    
    lastname: {
        type: String,
        required: [true, 'El apellido es requerido']
    },
    
    email: {
        type: String,
        required: [true, 'El  es requerido'],
        unique: true
    },
    
    password: {
        type: String,
        required: [true, 'La contrseña es requerida'],
    },

    image: {
        type: String,
    },
    
    role: {
        type: String,
        required: [true, 'Seleccione un rol'],
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },

    status: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: true
    }
})

UserSchena.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('user', UserSchena);