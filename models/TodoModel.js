const mongoose = require('mongoose');
const schema = mongoose.Schema;

const todoSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required: true
    },
    todo_title:{
        type: String,
        required: true
    },
    todo_description:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('todo', todoSchema)