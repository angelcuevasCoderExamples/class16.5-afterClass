const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    description: {
        type:String 
    }
})

const itemModel = mongoose.model('items', itemSchema)

module.exports = itemModel; 