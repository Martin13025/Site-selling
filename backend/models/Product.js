
const { Schema, model } = require('mongoose');


const Product = new Schema({
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number
    }
})




module.exports = model('Product', Product)