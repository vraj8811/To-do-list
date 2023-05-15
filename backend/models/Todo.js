const mongoose = require('mongoose');
const { Schema } = mongoose;


const todoSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    iscompleted:{
        type: Boolean,
        default: false
    }
  });

  module.exports = mongoose.model('todo',todoSchema);