const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    middle_name:{
        type: String
    },
    last_name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', userSchema)