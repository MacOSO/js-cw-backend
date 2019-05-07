const Products = require('./model');

exports.getAllProducts = (limit, offset) => Products.find({}).skip(offset).limit(limit);