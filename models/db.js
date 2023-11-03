const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

// connect to database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connected to MongoDb Database');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDb:', err.message);
    })

// create a schema
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
    timestamp: {
        type: Date,
        default: Date.now
    }
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema);