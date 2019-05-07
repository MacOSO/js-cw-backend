let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    name: String,
    price: Number,
    category: [String],
    description: String,
    specs: {
        socket: String,
        chipset: String
    }
});

module.exports = mongoose.model('products', productSchema);