const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModity: false
        });

        console.log('Base de datos Online...');

    } catch (err) {
        throw new Error('Error con la base de datos');
    }
}

module.exports = {
    dbConnection
}